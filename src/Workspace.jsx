var React = require('react');
var Node = require('./Node');
var Edge = require('./Edge');

var ID = 0;
var getID = () => ID++;

class Workspace extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            tools: props.tools,
            newEdge: null,
        };
        this.addNode = this.addNode.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleNodeClick = this.handleNodeClick.bind(this);
    }
    
    handleClick(e) {
        switch (this.props.tool) {
            case this.state.tools.NO_TOOL:
                console.error('No tool selected.');
                break;
            case this.state.tools.NODE_TOOL:
                this.addNode(e);
                break;
            case this.state.tools.EDGE_TOOL:
                console.error('clicked on Workspace with Edge Tool');
                break;
            default:
                console.error('no handler for tool: ', this.props.tool);
                break;
        }
    }
    
    addNode(e) {
        var x = e.pageX - e.target.getBoundingClientRect().left,
            y = e.pageY - e.target.getBoundingClientRect().top;
        this.setState({
            nodes: this.state.nodes.concat({x: x, y: y, name: "Node" + getID()})
        });
    }
    
    handleNodeClick(nodeName) {
        var src = this.state.nodes.find(node => node.name === nodeName);
        var newEdge = {
            src: src,
        };
        this.setState({newEdge: newEdge});
    }
    
    render() {
        var nodes = this.state.nodes.map(
            function (node, i) {
                return (
                    <Node
                        x={node.x}
                        y={node.y}
                        key={i}
                        onClick={this.handleNodeClick}
                        name={node.name}
                    />
                );
            }, this
        );
        
        var newEdge;
        if (this.state.newEdge) {
            var src = this.state.newEdge.src;
            newEdge = (
                <Edge
                    x1={src.x}
                    y1={src.y}
                    x2={src.x + 40}
                    y2={src.y + 40}
                />
            );
        } else {
            newEdge = <line />; // invisible
        }
        
        var frameStyle = {
            width: '500px',
            height: '600px',
            border: '1px solid black',
        };
        return (
            <svg
                onClick={this.handleClick}
                style={frameStyle}>
                {nodes}
                {newEdge}
            </svg>
        );
    }
}

Workspace.propTypes = {
    tool: React.PropTypes.string.isRequired,
    tools: React.PropTypes.object.isRequired,
};

module.exports = Workspace;
