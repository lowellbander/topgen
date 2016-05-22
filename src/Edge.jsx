var React = require('react');

class Edge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x1: props.x1,
            x2: props.x2,
            y1: props.y1,
            y2: props.y2,
            onClick: props.onClick,
        };
    }
    
    render() {
        return (
            <line 
                x1={this.props.x1}
                y1={this.props.y1}
                x2={this.props.x2}
                y2={this.props.y2}
                stroke="black"
                strokeWidth="10"
                onClick={this.state.onClick}
            />
        );
    }
}

Edge.PropTypes = {
    x1: React.PropTypes.number,
    x2: React.PropTypes.number,
    y1: React.PropTypes.number,
    y2: React.PropTypes.number,
};

function emptyFunction() {}

Edge.defaultProps = {
    x1: 10,
    y1: 40,
    x2: 40,
    y2: 10,
    onClick: emptyFunction,
};

module.exports = Edge;