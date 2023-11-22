const getOptions = require("./options");
const Metalsmith = require("metalsmith");
const path = require("path");
const Handlebars = require("handlebars");
const render = require("consolidate").handlebars.render;
const async = require("async");
const logger = require("./logger");
const chalk = require("chalk");
const ask = require("./ask");
const filter = require("./filter");

// 注册handlebars helpers
Handlebars.registerHelper("if_eq", function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

// Handlebars.registerHelper("unless_eq", function () {});

/**
 * @param {String} name
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */
module.exports = function generate(name, src, dest, done) {
  // console.log("name--->", name);
  // console.log("src--->", src);
  // console.log("dest--->", dest);
  // console.log("done--->", done);
  // getOptions的作用就是把meta.js中的配置选项，进行规范化的处理
  const opts = getOptions(name, src);
  // console.log("opts---->", opts);
  // 获取模板项目中的template目录内容
  // 对template进行处理
  // 把template copy到dest目录里
  // console.log(path.join(src, "template"));
  const metalsmith = Metalsmith(path.join(src, "template")); // 生成metalsmith
  // console.log("metalsmith---->", metalsmith);
  // 获取模板中的所有metadata，也就是metalsmith中的所有属性
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(), //直接在当前目录下生成项目
    noEscape: true, // 之后给大家解释
  });

  opts.helpers &&
    Object.keys(opts.helpers).map((key) => {
      Handlebars.registerHelper(key, opts.helpers[key]);
    });

  // 处理meta.js中的生命周期函数
  if (opts.metalsmith && typeof opts.metalsmith.before === "function") {
    opts.metalsmith.before(metalsmith, opts, { chalk, logger });
  }

  if (opts.metalsmith && typeof opts.metalsmith.after === "function") {
    opts.metalsmith.after(metalsmith, opts, { chalk, logger });
  }

  if (opts.metalsmith && typeof opts.metalsmith === "function") {
    opts.metalsmith(metalsmith, opts, { chalk, logger });
  }

  /**
   * 1. 以命令行交互的方式询问用户，得到用户的选项配置 askQuestions
   * 2. 根据用户的选项配置进行文件过滤
   * 3. 最终渲染模板
   */
  metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation));

  function askQuestions(prompts) {
    return function (files, metalsmith, done) {
      ask(prompts, metalsmith.metadata(), done);
    };
  }

  function filterFiles(filters) {
    return function (files, metalsmith, done) {
      filter(files, filters, metalsmith.metadata(), done);
    };
  }

  function renderTemplateFiles(skipInterpolation) {
    skipInterpolation =
      typeof skipInterpolation === "string"
        ? [skipInterpolation]
        : skipInterpolation;

    console.log("skipInterpolation--->", skipInterpolation);

    return (files, metalsmith, done) => {
      const keys = Object.keys(files);
      const metalsmithMetadata = metalsmith.metadata();

      // 遍历所有文件，进行分情况处理
      async.each(
        keys,
        (file, next) => {
          // 跳过skipInterpolation options中的文件
          if (
            skipInterpolation &&
            multimatch([file], skipInterpolation, { dot: true }).length
          ) {
            return next();
          }

          const str = files[file].contents.toString();
          // 跳过没有模板语法的文件
          if (!/{{([^{}]+)}}/g.test(str)) {
            return next();
          }
          // 处理带有模板语法的文件
          render(str, metalsmithMetadata, (err, res) => {
            if (err) {
              err.message = `[${file}] ${err.message}`;
              return next(err);
            }

            console.log("res---->", res);

            files[file].contents = new Buffer(res);

            next();
          });
        },
        done
      );
    };
  }

  metalsmith
    .clean(false)
    .source(".")
    .destination(dest)
    .build((err, files) => {
      done(err);

      console.log("项目生成后 metadata--->", metalsmith.metadata());
      // 生成项目之后即copy完之后，做一些操作
      // 执行npm install
      if (typeof opts.complete === "function") {
        const helpers = { chalk, logger, files };
        opts.complete(data, helpers);
      } else {
        logMessage(opts.completeMessage, data);
      }
    });

  // console.log("data---->", data);

  return data;
};

// 记录日志、打印日志的功能
function logMessage(message, data) {
  if (!message) return;
  console.log(message);
}
