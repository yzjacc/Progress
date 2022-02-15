const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    await this.ctx.render("index.html");
  }
};
