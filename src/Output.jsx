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
            return <p key={i}>{edge.props.src.state.name} {edge.props.dst.state.name}</p>;
        });

        return (
            <div style={style}>
                <p>#Name X Y</p>
                {nodes}
                <p>#Src Dst</p>
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