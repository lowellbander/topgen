
var SVG_NS = 'http://www.w3.org/2000/svg';

function draw(scene) {
    
    var state = {
        nodes: []
    };

    var setState = function (newState) {
        for (var attr in state) {
            state[attr] = newState[attr];
        }

        // clear scene
        while(scene.firstChild) {
            scene.removeChild(scene.firstChild);
        }
        
        // draw things
        state.nodes.forEach(function (node) {
            node.draw();
        });
    };

    var Node = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Node.prototype.draw = function () {
        var element = document.createElementNS(SVG_NS, 'circle');
        element.setAttribute('cx', this.x.toString());
        element.setAttribute('cy', this.y.toString());
        element.setAttribute('r', '5');
        scene.appendChild(element);
    };

   scene.onclick = function (e) {
       var node = new Node(e.clientX, e.clientY);
       setState({nodes:state.nodes.concat(node)});
   }
}

draw(document.getElementById('scene'));
