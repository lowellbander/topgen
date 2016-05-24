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
            selected: false,
        };
    }

    render() {
        var style = {
            fill: (this.props.selected) ? 'red' : 'blue',
        };
        return (
            <circle
                style={style}
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
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool,
    color: React.PropTypes.string,
};

module.exports = Node;
