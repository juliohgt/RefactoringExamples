const players = require("./Players");

module.exports = {
    amountFor(aPerformance){
      let result = 0;
      switch (players.playFor(aPerformance).type) {
        case "tragedy":
          result = 40000;
          if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
          }
          break;
        case "comedy":
          result = 30000;
          if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;
        default:
          throw new Error(`unknown type: ${players.playFor(aPerformance).type}`);
      }
      return result;
    },
    funcao2(){
        console.log("f2");
    }
}