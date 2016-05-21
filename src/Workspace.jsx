var React = require('react');

class Workspace extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }
    
    addNode() {
        console.log('adding new node');
    }
    
    render() {
        return (
            <svg onClick={this.addNode}>
                <circle cx="60" cy="60" r="50" />
            </svg>
        );
    }
}

module.exports = Workspace;
