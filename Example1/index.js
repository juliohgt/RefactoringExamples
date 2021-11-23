const { readFile, readFileSync } = require("fs");
const calc = require("./Calc");
const players = require("./Players");

var invoices = JSON.parse(readFileSync("./invoices.json", "utf8"));

console.log(statement(invoices[0]));

function statement(invoice) {
  let totalAmount = 0;  
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${players.playFor(perf).name}: ${usd(
      calc.amountFor(perf) / 100
    )} (${perf.audience} seats)\n`;
    totalAmount += calc.amountFor(perf);
  }

  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += calc.volumeCreditsFor(perf);
  }

  result += `Amount owed is ${usd(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber);
}
