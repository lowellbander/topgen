var Node = require('./Node');
var Interest = require('./Interest');

class Consumer extends Node {
  constructor(interestName) {
    super();
    this.interest = new Interest(interestName);
  }

  sendInterest() {
    this.forwarder.sendInterest(this.interest);
  }
}

module.exports = Consumer;
