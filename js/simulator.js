// Name Class

var Name = function(name) {
    this.name = name;
};

Name.prototype.getPrefix() {
  // Return the name - the last component
};

// Data Class

var Data = function(name) {
    this.name = new Name(name);
};

Data.prototype.getName() = function() {
  return this.name;
};

Data.prototype.getPrefix() = functio() {
  return this.name.getPrefix();
};

// Interest Class

var Interest = function(name) {
  this.name = name;
};

Interest.prototype.getName() = function() {
  return this.name;
}

// Link Class

var Link = function(source, destination, capacity) {
  this.source = source;
  this.destination = destination;
  this.capacity = capacity;
};

Link.prototype.sendInterest(interest) = function() {
  // Implement me
};

Link.prototype.sendData(data) = function() {
  // Implement me
};

Link.prototype.receiveInterest(interest) = function() {
  // Implement me
};

Link.prototype.receiveData(data) = function() {
  // Implement me
};

// Consumer Class

var Consumer = function(prefix) {

};

// Producer Class

var Producer = function(prefix) {

};

// Forwarder Class

var Forwarder = function(prefix) {

};
