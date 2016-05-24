var React = require('react');
var Name = require('./Name');
var Forwarder = require('./Forwarder');

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            forwarder : new Forwarder(this),
            prefix: new Name(props.prefix),
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
    prefix: React.PropTypes.object,
    forwarder : React.PropTypes.object, 
    onClick: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    color: React.PropTypes.string,
};

Node.defaultProps = {
    onClick: () => {},
};


module.exports = Node;
