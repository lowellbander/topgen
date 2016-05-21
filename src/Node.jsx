var React = require('react');

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.x = props.x;
        this.y = props.y;
        this.r = 20;
    }

    render() {
        return (
            <circle cx={this.x} cy={this.y} r={this.r} />
        );
    }
}

Node.propTypes = {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
};

module.exports = Node;
