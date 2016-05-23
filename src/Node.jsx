var React = require('react');

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
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
    onClick: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
};

function emptyFunction() {}

Node.defaultProps = {
    onClick: emptyFunction,
};

module.exports = Node;
