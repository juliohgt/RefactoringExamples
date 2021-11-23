const { readFile, readFileSync } = require('fs');
const calc = require('./Calc');

var invoices = JSON.parse(readFileSync('./invoices.json', 'utf8'));
var plays = JSON.parse(readFileSync('./plays.json', 'utf8'));

console.log(statement(invoices[0], plays));

function statement(invoice, plays) {
  
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calc.amountFor(perf, play);

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    
    // add extra credit for every ten comedy attendees    
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    
    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;    
  }
  
  result += `Amount owed is ${format(totalAmount / 100)}\n`;  
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}
