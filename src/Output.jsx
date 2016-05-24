var React = require('react');

class Output extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        var style = {
            fontFamily: 'monospace',
            float: 'right',
        };
        
        var nodes = this.props.nodes.map(function (node, i) {
            return <p key={i}>{node.props.name} {node.props.x} {node.props.y}</p>;
        });
        
        var edges = this.props.edges.map(function (edge, i) {
            return <p key={i}>{edge.props.node1.node.state.name} {edge.props.node2.node.state.name}</p>;
        });

        return (
            <div style={style}>
                <p>#Name X Y</p>
                {nodes}
                <p>#Node1 Node2</p>
                {edges}
            </div>
        );
    }
}

Output.propTypes = {
    nodes: React.PropTypes.array.isRequired,
    edges: React.PropTypes.array.isRequired,
};

module.exports = Output;