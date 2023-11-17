/*
 * @Author: 崔浩然
 * @Date: 2023-06-25 16:31:38
 * @Description: 页面/组件/功能的描述
 * @FilePath: /my-cli/lib/filter.js
 */
const match = require("minimatch");
const evaluate = require("./eval");

module.exports = function (files, filters, data, done) {
  if (!filters) {
    return done();
  }

  const fileNames = Object.keys(files);

  Object.keys(filters).forEach(function (glob) {
    console.log(glob);
    fileNames.forEach((file) => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob];
        if (!evaluate(condition, data)) {
          delete files[file];
        }
      }
    });
  });

  done();
};
