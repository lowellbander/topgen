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

        // TODO: make a Tool class so this resizing is generalized

        var nTools = 3;

        return (
            <svg style={frameStyle}>
                <polygon
                    points="10,10 40,20, 40,40"
                    stroke="black"
                    onClick={this.state.setTool.bind(null, this.state.tools.SELECT_TOOL)}
                />
                <Node
                    x={this.state.width / (nTools + 1)}
                    y={this.state.height / 2}
                    onClick={this.state.setTool.bind(null, this.state.tools.NODE_TOOL)}
                    name={"NodeTool"}
                />
                <line
                    x1={this.state.width / nTools}
                    x2={30 + this.state.width / nTools}
                    y1={10}
                    y2={40}
                    stroke="black"
                    strokeWidth="10"
                    onClick={this.state.setTool.bind(null, this.state.tools.EDGE_TOOL)}
                />
                <polygon
                    points="250,20 250,200 50,250"
                    y="10"
                    stroke="black"
                    onClick={this.state.setTool.bind(null, this.state.tools.PLAY_TOOL)}
                />
                <rect
                    x="270"
                    y="10"
                    width="30"
                    height="30"
                    stroke="black"
                    onClick={this.state.setTool.bind(null, this.state.tools.STOP_TOOL)}
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
