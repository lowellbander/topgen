var React = require('react');
var Node = require('./Node');
var createFragment = require('react-addons-create-fragment');

class Workspace extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
        this.addNode = this.addNode.bind(this);
    }
    
    addNode(e) {
        var x = e.pageX - e.target.getBoundingClientRect().left,
            y = e.pageY - e.target.getBoundingClientRect().top;
        this.setState({
            nodes: this.state.nodes.concat(new Node({x: x, y: y}))
        });
    }
    
    render() {
        var nodes = this.state.nodes.map((node, i) => <Node x={node.x} y={node.y} key={i}/>);
        var frameStyle = {
            width: '500px',
            height: '700px',
            border: '1px solid black',
        };
        return (
            <svg onClick={this.addNode} style={frameStyle}>
                {nodes}
            </svg>
        );
    }
}

module.exports = Workspace;
