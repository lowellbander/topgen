var React = require('react');
var NodeImpl = require('./NodeImpl');
var Name = require('./Name');
var Producer = require('./Producer');
var Consumer = require('./Consumer');
var Forwarder = require('./Forwarder');

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            nodeType: props.nodeType,
            nodeImpl: constructNodeImpl(props.nodeType, props.prefix),
            prefix: new Name(props.prefix),
            r: 20,
            onClick: props.onClick,
            name: props.name,
        };
    }

    render() {
        return (
            <circle
                cx={this.state.x}
                cy={this.state.y}
                r={this.state.r}
                onClick={this.state.onClick.bind(null, this)}
            />
        );
    }
}

Node.propTypes = {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    prefix: React.PropTypes.object,
    nodeImpl: React.PropTypes.object.isRequired,
    nodeType: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
};

function emptyFunction() {}

Node.defaultProps = {
    onClick: emptyFunction,
};

constructNodeImpl = function(nodeType, prefix) {
  if (nodeType === "producer") {
    return new Producer(prefix)
  }
  else if (nodeType === "consumer") {
    return new Consumer(prefix)
  }
  else if (nodeType === "forwarder") {
    var forwNode = new NodeImpl()
    return new Forwarder(forwNode)
  }
  // Spyros: Should we handle the error case?
};

module.exports = Node;
