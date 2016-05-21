var React = require('react');
var Workspace = require('./Workspace');

class Topgen extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h1>Welcome to Topgen</h1>
                <Workspace />
            </div>
        );
    }
}

module.exports = Topgen;
