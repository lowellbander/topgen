var React = require('react');
var Workspace = require('./Workspace');
var Toolbox = require('./Toolbox');
var Node = require('./Node');
var Edge = require('./Edge');
var AttributesBox = require('./AttributesBox');
var Output = require('./Output');

var ID = 0;
var getID = () => ID++;

class Topgen extends React.Component {
    constructor(props) {
        super(props);
        var tools = {
            NO_TOOL: 'NO_TOOL',
            NODE_TOOL: 'NODE_TOOL',
            EDGE_TOOL: 'EDGE_TOOL',
            SELECT_TOOL: 'SELECT_TOOL',
        };
        this.state = {
            tools: tools,
            tool: tools.NO_TOOL,
            selectedNode: null,
            nodes: [],
            edges: [],
        };
        this.setTool = this.setTool.bind(this);
        this.setSelectedNode = this.setSelectedNode.bind(this);
        this.addNode = this.addNode.bind(this);
        this.addEdge = this.addEdge.bind(this);
    }

    setTool(tool) {
        this.setState({tool: tool});
    }
    
    setSelectedNode(node) {
        this.setState({selectedNode:node});
    }
    
    addNode({x, y}={}) {
        var id = getID();
        var newNode = (
            <Node
                x={x}
                y={y}
                key={id}
                name={"Node" + id}
            />
        );
        this.setState({nodes: this.state.nodes.concat(newNode)});
    }
    
    addEdge({src, dst}={}) {
        var edge = (
            <Edge
                src={src}
                dst={dst}
                key={getID()}
            />
        );
        this.setState({edges: this.state.edges.concat(edge)})
    }

    render() {
        return (
            <div>
                <h1>Welcome to Topgen</h1>
                <Output
                    nodes={this.state.nodes}
                    edges={this.state.edges}
                />
                <Toolbox
                    setTool={this.setTool}
                    tools={this.state.tools}
                />
                <Workspace
                    nodes={this.state.nodes}
                    edges={this.state.edges}
                    tools={this.state.tools}
                    tool={this.state.tool}
                    setSelectedNode={this.setSelectedNode}
                    selectedNode={this.state.selectedNode}
                    addNode={this.addNode}
                    addEdge={this.addEdge}
                />
                <AttributesBox
                    selectedNode={this.state.selectedNode}
                />
            </div>
        );
    }
}

module.exports = Topgen;
