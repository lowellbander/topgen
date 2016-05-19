
var SVG_NS = 'http://www.w3.org/2000/svg';

function draw(scene) {
    
    // GLOBALS
    var modes = {
        INIT: 'INIT',
        ADD_NODE: 'ADD_NODE',
        ADD_EDGE_SRC: 'ADD_EDGE_SRC',
        ADD_EDGE_DST: 'ADD_EDGE_DST'
    };
    
    var state = {};
    
    // CLASSES
    var Node = function (point, onClick, name) {
        this.name = name || this.getNewName();
        this.point = point;
        this.onClick = (onClick || function () {}).bind(this);
    };
    
    var nodeIndex = 0;
    Node.prototype.getNewName = function () {
        return "Node" + (nodeIndex++);
    };

    Node.prototype.draw = function () {
        var node = document.createElementNS(SVG_NS, 'circle');
        node.setAttribute('cx', this.point.x);
        node.setAttribute('cy', this.point.y);
        node.setAttribute('r', '15');
        node.addEventListener("click", this.onClick);
        scene.appendChild(node);
    };
    
    Node.prototype.serialize = function () {
        var tab = '\t';
        return this.name + tab + this.point.x + tab + this.point.y;
    };
    
    var Point = function (x, y) {
        this.x = x;
        this.y = y;
    };
    
    var Edge = function (p1, p2, src, dst, onClick) {
        this.p1 = p1;
        this.p2 = p2;
        this.src = src || null;
        this.dst = dst || null;
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
    
    var Text = function (point, body) {
        this.point = point;
        this.body = body;
    };
    
    Text.prototype.draw = function () {
        var text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', this.point.x);
        text.setAttribute('y', this.point.y);
        text.innerHTML = this.body;
        scene.appendChild(text);
    };
    
    var generateOutput = function () {
        state.output = [];
        var x = 10;
        var y = 400;
        var lineHeight = 20;
        var header = "#Name \t x \t y";
        state.output = [new Text(new Point(x, y), header)].concat(state.nodes.filter(function (node, i) {
            return i !== 0;
        }).map(function (node) {
            return node.serialize();
        }).map(function (serialization) {
            return new Text(new Point(x, y += lineHeight), serialization);
        }));
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
        if (state.newEdge) state.newEdge.draw();
        
        generateOutput();
        state.output.forEach(function (line) {
            line.draw();
        });
    };

    scene.onmousemove = function (e) {
        switch (state.mode) {
            case modes.ADD_EDGE_DST:
                var p1 = state.newEdge.p1;
                var p2 = new Point(e.clientX, e.clientY);
                setState({newEdge: new Edge(p1, p2, state.newEdge.src)});
                break;
        }
    };
    
    // TODO: this is getting bulky, perhaps it's time for a refactor
    scene.onclick = function (e) {
        switch (state.mode) {
            case modes.ADD_NODE:
                var node = new Node(new Point(e.clientX, e.clientY), function () {
                    switch (state.mode) {
                        case modes.ADD_EDGE_SRC:
                            var src = new Point(this.point.x, this.point.y);
                            var dst = new Point(this.point.x + 20, this.point.y - 20);
                            setState({
                                newEdge: new Edge(src, dst, this),
                                mode: modes.ADD_EDGE_DST
                            });
                            break;
                        case modes.ADD_EDGE_DST:
                            var src = state.newEdge.p1;
                            var dst = new Point(this.point.x, this.point.y);
                            setState({
                                edges: state.edges.concat(new Edge(src, dst, state.newEdge.src, this)),
                                newEdge: null,
                                mode: modes.ADD_EDGE_SRC
                            });
                            break;
                    }
                });
                setState({nodes:state.nodes.concat(node)});
                break;
        }
    };
    
    // INIT
    var prototypeNode = new Node(new Point(20, 20), function (e) {
        e.stopPropagation();
        setState({mode: modes.ADD_NODE})
    }, "PROTO");
    var prototypeEdge = new Edge(new Point(10, 65), new Point(30, 50), null, null, function (e) {
        e.stopPropagation();
        setState({mode: modes.ADD_EDGE_SRC})
    });
    setState({
        nodes: [prototypeNode],
        edges: [prototypeEdge],
        mode: modes.INIT,
        newEdge: null,
        output: []
    });
}

draw(document.getElementById('scene'));
