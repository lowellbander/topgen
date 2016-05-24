var React = require('react');

class AttributesBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Hello world',
        };
        this.changeName = this.changeName.bind(this);
    }

    changeName(e) {
        // TODO: this causes problems, so perhaps nodes should be stored in topgen
        // this.props.selectedNode.update({name: e.target.value});
    }
    
    mutateNode(e) {
        
    }

    render() {
        var style = {
            width: '500px',
            border: '1px solid black',
        };
        var node = this.props.selectedNode;
        return (
            (node)
                ? (
                <div style={style}>
                    <p>Attributes Box</p>
                    <label>Node Name </label>
                    <input
                        type="text"
                        value={node.props.name}
                        onChange={this.changeName}
                    />
                </div>
            ) : (
                <div style={style}>
                    <p>No node selected</p>
                </div>
            )
        );
    }
}

AttributesBox.propTypes = {
    selectedNode: React.PropTypes.object,  
};

module.exports = AttributesBox;