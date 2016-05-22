var React = require('react');
var Workspace = require('./Workspace');
var Toolbox = require('./Toolbox');

class Topgen extends React.Component {
    constructor(props) {
        super(props);
        var tools = {
            NO_TOOL: 'NO_TOOL',
            NODE_TOOL: 'NODE_TOOL',
            EDGE_TOOL: 'EDGE_TOOL',
        };
        this.state = {
            tools: tools,
            tool: tools.NO_TOOL,
        };
        this.setTool = this.setTool.bind(this);
    }

    setTool(tool) {
        this.setState({tool: tool});
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
                />
            </div>
        );
    }
}

module.exports = Topgen;
