var React = require('react');
var Node = require('./Node');

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
        
        return (
            <svg style={frameStyle}>
                <Node 
                    x={this.state.width / 2}
                    y={this.state.height / 2}
                    onClick={this.state.setTool.bind(null, this.state.tools.NODE_TOOL)}
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
