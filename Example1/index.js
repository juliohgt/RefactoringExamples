const { readFileSync } = require("fs");
const calc = require("./Calc");
const { playFor } = require("./Players");
const { Usd } = require("./Utils");

var invoices = JSON.parse(readFileSync("./invoices.json", "utf8"));

invoices.forEach((element) => {
  console.log(statement(element));
});

function statement(invoice) {
  return renderPlainText(invoice);
}

function renderPlainText(invoice) {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${Usd(calc.amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${Usd(calc.totalAmount(invoice) / 100)}\n`;
  result += `You earned ${calc.totalVolumeCredits(invoice)} credits\n`;

  return result;
}
