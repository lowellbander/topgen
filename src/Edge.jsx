var React = require('react');
var Node = require('./Node');

class Edge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: props.onClick,
            capacity: props.capacity,
            src: props.src.forwarder,
            dst: props.dst.forwarder,
            currPacketCount: 0,
        };
    }

    render() {
        var src = this.props.src,
            dst = this.props.dst;
        return (
            <line
                x1={src.state.x}
                y1={src.state.y}
                x2={dst.state.x}
                y2={dst.state.y}
                stroke="black"
                strokeWidth="10"
                onClick={this.state.onClick}
            />
        );
    }

    registerPrefix(src, prefix) {
        var dst = (src == this.src) ? this.dst : this.src;
        dst.registerPrefix(this, prefix)
    }

    sendInterest(src, interest) {
        var dst = (src == this.src) ? this.dst : this.src;
        dst.receiveInterest(this, interest);
    }

    sendData(src, data) {
        var dst = (src == this.src) ? this.dst : this.src;
        dst.receiveData(this, data);
    }
}

Edge.PropTypes = {
    src: React.PropTypes.object.isRequired,
    dst: React.PropTypes.object.isRequired,
    link: React.PropTypes.object.isRequired,
    capacity: React.PropTypes.number.isRequired
};

function emptyFunction() {}

Edge.defaultProps = {
    onClick: emptyFunction,
};

module.exports = Edge;