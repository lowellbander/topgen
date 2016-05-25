var React = require('react');
var Node = require('./Node');
var Edge = require('./Edge');
var Output = require('./Output');

class Workspace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            edges: [],
            tools: props.tools,
            newEdge: null,
            selectedNode: null,
            setSelectedNode: props.setSelectedNode,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.handleEdgeDrawing = this.handleEdgeDrawing.bind(this);
    }

    handleClick(e) {
        switch (this.props.tool) {
            case this.state.tools.NO_TOOL:
                console.error('No tool selected.');
                break;
            case this.state.tools.NODE_TOOL:
                var x = e.pageX - e.target.getBoundingClientRect().left,
                    y = e.pageY - e.target.getBoundingClientRect().top;
                this.props.addNode({x: x, y: y});
                break;
            case this.state.tools.EDGE_TOOL:
            case this.state.tools.SELECT_TOOL:
                // handled elsewhere
                break;
            case this.state.tools.PLAY_TOOL:
                // Decide what to do with play
                break;
            case this.state.tools.STOP_TOOL:
                // Decide what to do with stop
                break;
            default:
                console.error('no handler for tool: ', this.props.tool);
                break;
        }
    }

    handleNodeClick(node) {
        switch (this.props.tool) {
            case this.props.tools.EDGE_TOOL:
                this.handleEdgeDrawing(node);
                break;
            case this.props.tools.SELECT_TOOL:
                this.state.setSelectedNode(node);
                break;
            default:
                break;
        }
    }

    handleEdgeDrawing(node) {
        if (!this.state.newEdge) {
            // start
            var newEdge = {src: node};
            this.setState({newEdge: newEdge});
        } else {
            // finish
            this.props.addEdge({src: this.state.newEdge.src, dst: node});
            this.setState({newEdge: null});
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

        var nodes = this.props.nodes.map(function (node) {
            return (this.props.selectedNode && node.props.name === this.props.selectedNode.props.name)
                ? <Node
                    x={node.props.x}
                    y={node.props.y}
                    name={node.props.name}
                    selected={true}
                    key={node.key}
                    onClick={this.handleNodeClick}
                  />
                : <Node
                    x={node.props.x}
                    y={node.props.y}
                    name={node.props.name}
                    selected={false}
                    key={node.key}
                    onClick={this.handleNodeClick}
                  />;
        }, this);

        return (
            <div>
                <svg
                    id={"scene"}
                    onClick={this.handleClick}
                    style={frameStyle}
                    onMouseMove={this.onMouseMove}
                >
                    {this.props.edges}
                    {newEdge}
                    {nodes}
                </svg>
            </div>
        );
    }
}

Workspace.propTypes = {
    tool: React.PropTypes.string.isRequired,
    tools: React.PropTypes.object.isRequired,
    setSelectedNode: React.PropTypes.func.isRequired,
    nodes: React.PropTypes.array.isRequired,
    edges: React.PropTypes.array.isRequired,
    selectedNode: React.PropTypes.object,
    addNode: React.PropTypes.func.isRequired,
    addEdge: React.PropTypes.func.isRequired,
};

module.exports = Workspace;
