const { readFileSync } = require("fs");
const calc = require("./Calc");
const { playFor } = require("./Players");
const { Usd } = require("./Utils");

var invoices = JSON.parse(readFileSync("./invoices.json", "utf8"));

invoices.forEach((element) => {
  console.log(statement(element));
});

function statement(invoice) {
  const statementData = {};
  
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  return renderPlainText(statementData);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${perf.play.name}: ${Usd(perf.amount / 100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${Usd(calc.totalAmount(data) / 100)}\n`;
  result += `You earned ${calc.totalVolumeCredits(data)} credits\n`;

  return result;
}

function enrichPerformance(aPerformance) {  
  var result = Object.assign({}, aPerformance);    
  result.play = playFor(result);
  result.amount = calc.amountFor(result);
  return result;
}
