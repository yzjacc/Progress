const path = require("path");
const exists = require("fs").existsSync;
const metadata = require("read-metadata");

module.exports = function getOptions(name, dir) {
  // 获取meta.json或meta.js中的配置
  const opts = getMetadata(dir);
  // 设置opts的默认值
  setDefault(opts, "name", name);

  return opts;
};

function getMetadata(dir) {
  const json = path.join(dir, "meta.json");
  const js = path.join(dir, "meta.js");

  console.log("json---->", json);
  console.log("js---->", js);

  let opts = {};
  if (exists(json)) {
    opts = metadata.sync(json);
  } else if (exists(js)) {
    const req = require(path.resolve(js));
    if (req !== Object(req)) {
      throw new Error("req不是一个对象");
    }

    opts = req;
  }

  return opts;
}

function setDefault(opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema;
    delete opts.schema;
  }
  const prompts = opts.prompts || (opts.prompts = {});

  if (!prompts[key] || typeof prompts[key] !== "object") {
    prompts[key] = {
      type: "string",
      default: val,
    };
  } else {
    prompts[key]["default"] = val;
  }
}
