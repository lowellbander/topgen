var React = require('react');
var Link = require('./Link');

class Edge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: props.onClick,
            capacity: props.capacity,
            link: new Link(props.src, props.dst, props.capacity)
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
