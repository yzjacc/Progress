#!/usr/bin/env node

const request = require("request");
const chalk = require("chalk");

process.on("exit", () => {
  // Node进程结束
  console.log();
});

request(
  {
    url: "https://api.github.com/users/vuejs-templates/repos",
    headers: {
      "User-Agent": "vue-cli",
    },
  },
  function (err, res, body) {
    if (err) console.log(chalk.red(err));
    const requestBody = JSON.parse(body);
    if (Array.isArray(requestBody)) {
      console.log();
      console.log(chalk.green("  Available official templates:  "));
      console.log();
      requestBody.forEach((repo) => {
        console.log(
          "  " +
            chalk.yellow("*") +
            " " +
            chalk.green(repo.name) +
            " - " +
            chalk.blue(repo.description)
        );
      });
    } else {
      console.log(chalk.red(requestBody.message));
    }
  }
);
