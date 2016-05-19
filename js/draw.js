
var SVG_NS = 'http://www.w3.org/2000/svg';

function draw(scene) {
    
    // GLOBALS
    var modes = {
        INIT: 'INIT',
        ADD_NODE: 'ADD_NODE'
    };
    
    var state = {};
    
    // CLASSES
    var Node = function (point, onClick) {
        this.point = point;
        this.onClick = onClick || function () {};
    };

    Node.prototype.draw = function () {
        var node = document.createElementNS(SVG_NS, 'circle');
        node.setAttribute('cx', this.point.x);
        node.setAttribute('cy', this.point.y);
        node.setAttribute('r', '15');
        node.addEventListener("click", this.onClick);
        scene.appendChild(node);
    };
    
    var Point = function (x, y) {
        this.x = x;
        this.y = y;
    };
    
    var Edge = function (p1, p2, onClick) {
        this.p1 = p1;
        this.p2 = p2;
        this.onClick = onClick || function () {};
    };
    
   Edge.prototype.draw = function () {
        var line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', this.p1.x);
        line.setAttribute('y1', this.p1.y);
        line.setAttribute('x2', this.p2.x);
        line.setAttribute('y2', this.p2.y);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '6');
        line.addEventListener("click", this.onClick);
        scene.appendChild(line);
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
        state.edges.forEach(function (edge) {
            edge.draw();
        });
    };

   scene.onclick = function (e) {
       switch (state.mode) {
           case modes.ADD_NODE:
               var node = new Node(new Point(e.clientX, e.clientY));
               setState({nodes:state.nodes.concat(node)});
               break;
       }
   };
    
    // get things going
    var prototypeNode = new Node(new Point(20, 20), function (e) {
        e.stopPropagation();
        setState({mode: modes.ADD_NODE})
    });
    var prototypeEdge = new Edge(new Point(10, 65), new Point(30, 50));
    setState({
        nodes: [prototypeNode],
        edges: [prototypeEdge],
        mode: modes.INIT
    });
}

draw(document.getElementById('scene'));
