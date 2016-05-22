var React = require('react');

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            r: 20,
            onClick: props.onClick,
        };
    }

    render() {
        return (
            <circle
                cx={this.state.x}
                cy={this.state.y}
                r={this.state.r}
                onClick={this.state.onClick}
            />
        );
    }
}

Node.propTypes = {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
};

function emptyFunction() {}

Node.defaultProps = {
    onClick: emptyFunction,
};

module.exports = Node;
