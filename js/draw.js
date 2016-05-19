
var SVG_NS = 'http://www.w3.org/2000/svg';

function draw(scene) {
    
    // GLOBALS
    var modes = {
        INIT: 'INIT',
        ADD_NODE: 'ADD_NODE'
    };
    
    var state = {
        nodes: [],
        mode: modes.INIT
    };
    
    // CLASSES
    var Node = function (x, y, onClick) {
        this.x = x;
        this.y = y;
        this.onClick = onClick || function () {};
    };

    Node.prototype.draw = function () {
        var element = document.createElementNS(SVG_NS, 'circle');
        element.setAttribute('cx', this.x);
        element.setAttribute('cy', this.y);
        element.setAttribute('r', '15');
        element.addEventListener("click", this.onClick);
        scene.appendChild(element);
    };

    // SETUP
    var setState = function (newState) {
        for (var attr in newState) {
            state[attr] = newState[attr];
        }
        
        console.log(state);

        // clear scene
        while(scene.firstChild) {
            scene.removeChild(scene.firstChild);
        }
        
        // draw things
        state.nodes.forEach(function (node) {
            node.draw();
        });
    };

   scene.onclick = function (e) {
       switch (state.mode) {
           case modes.ADD_NODE:
               var node = new Node(e.clientX, e.clientY);
               setState({nodes:state.nodes.concat(node)});
               break;
       }
   };
    
    // get things going
    var prototypeNode = new Node(20, 20, function (e) {
        e.stopPropagation();
        setState({mode: modes.ADD_NODE})
    });
    setState({
        nodes: [prototypeNode],
        mode: modes.INIT
    });
}

draw(document.getElementById('scene'));
