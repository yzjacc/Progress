const getOptions = require("./options");

/**
 *
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
  const opts = getOptions(name, src);
  console.log("opts---->", opts);
};
