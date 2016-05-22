var React = require('react');
var Node = require('./Node');

class Workspace extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            tools: props.tools,
        };
        this.addNode = this.addNode.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        switch (this.props.tool) {
            case this.state.tools.NODE_TOOL:
                this.addNode(e);
                break;
            case this.state.tools.NO_TOOL:
                console.error('No tool selected.');
                break;
        }
    }
    
    addNode(e) {
        var x = e.pageX - e.target.getBoundingClientRect().left,
            y = e.pageY - e.target.getBoundingClientRect().top;
        this.setState({
            nodes: this.state.nodes.concat({x: x, y: y})
        });
    }
    
    render() {
        var nodes = this.state.nodes.map((node, i) => <Node x={node.x} y={node.y} key={i}/>);
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
            </svg>
        );
    }
}

Workspace.propTypes = {
    tool: React.PropTypes.string.isRequired,
    tools: React.PropTypes.object.isRequired,
};

module.exports = Workspace;
