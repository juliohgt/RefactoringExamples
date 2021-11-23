const { readFile, readFileSync } = require("fs");
var plays = JSON.parse(readFileSync("./plays.json", "utf8"));

module.exports = {
  playFor(aPerformance) {
    return plays[aPerformance.playID];
  },
};
