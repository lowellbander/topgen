var React = require('react');
var Workspace = require('./Workspace');
var Toolbox = require('./Toolbox');
var AttributesBox = require('./AttributesBox');

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
        };
        this.setTool = this.setTool.bind(this);
        this.setSelectedNode = this.setSelectedNode.bind(this);
    }

    setTool(tool) {
        this.setState({tool: tool});
    }
    
    setSelectedNode(node) {
        this.setState({selectedNode:node});
    }
    
    render() {
        return (
            <div>
                <h1>Welcome to Topgen</h1>
                <Toolbox
                    setTool={this.setTool}
                    tools={this.state.tools}
                />
                <Workspace
                    tools={this.state.tools}
                    tool={this.state.tool}
                    setSelectedNode={this.setSelectedNode}
                    selectedNode={this.state.selectedNode}
                />
                <AttributesBox
                    selectedNode={this.state.selectedNode}
                />
            </div>
        );
    }
}

module.exports = Topgen;
