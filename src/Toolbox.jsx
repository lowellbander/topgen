var React = require('react');
var Node = require('./Node');
var Edge = require('./Edge');

class Toolbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 50,
            width: 500,
            setTool: props.setTool,
            tools: props.tools,
        };
    }
    
    render() {
        var frameStyle = {
            width: this.state.width,
            height: this.state.height,
            border: '1px solid black',
        };
        
        // TODO: make a Tool class so this resizing is generalized
        
        var nTools = 2;
        
        return (
            <svg style={frameStyle}>
                <Node 
                    x={this.state.width / (nTools + 1)}
                    y={this.state.height / 2}
                    onClick={this.state.setTool.bind(null, this.state.tools.NODE_TOOL)}
                    name={"NodeTool"}
                />
                <Edge
                    x1={this.state.width / nTools}
                    x2={30 + this.state.width / nTools}
                    onClick={this.state.setTool.bind(null, this.state.tools.EDGE_TOOL)}
                />
            </svg>
        );
    }
}

Toolbox.propTypes = {
    setTool: React.PropTypes.func.isRequired,
    tools: React.PropTypes.object.isRequired,
};

module.exports = Toolbox;
