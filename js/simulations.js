var Abstract = function() {
    throw Error("This method should never be call")
};

function Simulation() {
    class Name {
        constructor(name) {
            this.name = name;
        };
        get prefix() {
            // return all components minus the last
        };
    }

    class Interest {
        constructor(name) {
            this.name = name;
        };
    }

    class Data {
        constructor(name) {
            this.name = new Name(name);
        };
    }

    class Forwarder {
        constructor(node) {
            this.node = node;
            this.links = [];
            this.fib = [];
            this.pit = [];
        };

        addLink(link) {
            this.links.push(link);
        }

        announcePrefix(prefix) {
            for (var link in this.links) {
                link.registerPrefix(this, prefix);
            }
        }

        registerPrefix(link, prefix) {
            this.fib[prefix] = link;
        }

        sendInterest(interest) {
            var link = this.fib[interest.name];
            if (link) {
                link.sendInterest(this, interest);
            }
        }

        receiveInterest(link, interest) {
            this.pit[interest] = link;
            this.node.receiveInterest(interest);
        }

        receiveData(link, data) {
            this.node.receiveData(data);
        }

        sendData(interest, data) {
            var link = this.pit[interest];
            if (link) {
                this.pit.remove(interest);
                link.sendData(this, data);
            }
        }
    }

    class Node {
        constructor() {
            this.forwarder = new Forwarder(this);
        };
    }

    class Producer extends Node {
        constructor(dataName) {
          this.data = new Data(dataName);
        }; 

        initialize() {
            this.forwarder.announcePrefix(this.data.name.prefix);
        }

        receiveInterest(interest) {
            this.forwarder.sendData(interest, this.data);
        }
    }

    class Consumer extends Node {
        constructor(interestName) {
            this.interest = new Interest(name);
        }
        sendInterest() {
            this.forwarder.sendInterest(this.interest);
        }
    }

    class Link {
        constructor(node1, node2, capacity) {
            this.currPacketCount = 0;
            this.node1 = node1;
            this.node2 = node2;
            this.capacity = capacity;
        };

        registerPrefix(src, prefix) {
            var dst = (src == this.node1) ? this.node2 : this.node1;
            dst.registerPrefix(this, prefix)
        };

        sendInterest(src, interest) {
            var dst = (src == this.node1) ? this.node2 : this.node1;
            dst.receiveInterest(this, interest);
        };

        sendData(src, data) {
            var dst = (src == this.node1) ? this.node2 : this.node1;
            dst.receiveData(this, data);
        };
    }
}

export default Simulation;