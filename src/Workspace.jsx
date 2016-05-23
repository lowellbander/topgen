var React = require('react');
var Node = require('./Node');
var Edge = require('./Edge');
var Output = require('./Output');

var ID = 0;
var getID = () => ID++;

class Workspace extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            edges: [],
            tools: props.tools,
            newEdge: null,
        };
        this.addNode = this.addNode.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
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
                break;
            default:
                console.error('no handler for tool: ', this.props.tool);
                break;
        }
    }
    
    addNode(e) {
        var x = e.pageX - e.target.getBoundingClientRect().left,
            y = e.pageY - e.target.getBoundingClientRect().top,
            id = getID();
        var newNode = (
             <Node
                 x={x}
                 y={y}
                 name={"Node" + id}
                 key={id}
                 onClick={this.handleNodeClick}
             />
        );
        this.setState({nodes: this.state.nodes.concat(newNode)});
    }
    
    handleNodeClick(node) {
        if (!this.state.newEdge) {
            // start
            var newEdge = {src: node};
            this.setState({newEdge: newEdge});
        } else {
            // finish
            var edge = (
                <Edge
                    src={this.state.newEdge.src}
                    dst={node}
                    key={getID()}
                />
            );
            this.setState({
                edges: this.state.edges.concat(edge),
                newEdge: null,
            });
        }
    }
    
    onMouseMove(e) {
        if (this.state.newEdge && e.target.id === 'scene') {
            var x = e.pageX - e.target.getBoundingClientRect().left,
                y = e.pageY - e.target.getBoundingClientRect().top;
            var newEdge = this.state.newEdge;
            newEdge.x = x;
            newEdge.y = y;
            this.setState({newEdge: newEdge});
        }
    }
    
    render() {
        
        var newEdge;
        if (this.state.newEdge) {
            var src = this.state.newEdge.src;
            newEdge = (
                <line
                    x1={src.state.x}
                    y1={src.state.y}
                    x2={this.state.newEdge.x || src.state.x + 40}
                    y2={this.state.newEdge.y || src.state.y + 40}
                    stroke="black"
                    strokeWidth="10"
                />
            );
        } else {
            newEdge = <line />; // invisible
        }
        
        var frameStyle = {
            width: '500px',
            height: '400px',
            border: '1px solid black',
        };
        return (
            <div>
                <svg
                    id={"scene"}
                    onClick={this.handleClick}
                    style={frameStyle}
                    onMouseMove={this.onMouseMove}
                >
                    {this.state.edges}
                    {newEdge}
                    {this.state.nodes}
                </svg>
                <Output
                    edges={this.state.edges}
                    nodes={this.state.nodes}
                />
            </div>
        );
    }
}

Workspace.propTypes = {
    tool: React.PropTypes.string.isRequired,
    tools: React.PropTypes.object.isRequired,
};

module.exports = Workspace;
