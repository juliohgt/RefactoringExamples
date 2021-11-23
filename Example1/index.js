const { readFile, readFileSync } = require("fs");
const calc = require("./Calc");
const players = require("./Players");

var invoices = JSON.parse(readFileSync("./invoices.json", "utf8"));

console.log(statement(invoices[0]));

function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    let thisAmount = calc.amountFor(perf, players.playFor(perf));

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    if ("comedy" === players.playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);

    // print line for this order
    result += ` ${players.playFor(perf).name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}