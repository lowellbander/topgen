
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
    
    var classes = {
        PRESERVE: 'PRESERVE',
    };
    
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
    
    Edge.prototype.serialize = function () {
        return this.src.name + ' ' + this.dst.name;
    };
    
    var Text = function (point, body) {
        this.point = point;
        this.body = body;
    };

    var Scrubber = function (value, dragging) {

        this.value = value || 1;
        
        this.x = 300;
        this.length = 150;
        this.dragging = dragging || false;
    };
    
    Scrubber.prototype.update = function (value) {
        this.value = value;

        var index = Math.min((history.length - 1), Math.floor(this.value * history.length));
        history = history.slice(0, index);
        setState(history[history.length - 1]);

        //redraw
        Array.prototype.slice.call(scene.getElementsByClassName('scrubber')).forEach(function (element) {
            scene.removeChild(element);
        });
        this.draw();
    };
    
    Scrubber.prototype.draw = function () {
        var line = document.createElementNS(SVG_NS, 'line');
        var y = 400;
        var r = 20;
        line.setAttribute('x1', this.x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', this.x + this.length);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '3');
        line.classList.add('scrubber', classes.PRESERVE);
        scene.appendChild(line);

        var circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('cx', this.x + this.value * this.length);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', r);
        circle.classList.add('scrubber', classes.PRESERVE);
        circle.addEventListener("mousedown", (function () {
            this.dragging = true;
        }).bind(this));
        circle.addEventListener("mouseup", (function () {
            this.dragging = false;
        }).bind(this));
        circle.addEventListener("mousemove", (function (e) {
            var x = e.clientX;
            if (this.dragging && x > this.x - r && x < this.x + this.length + r) {
                var value = (x - this.x) / this.length;
                if (value > 1) {
                    value = 1;
                } else if (value < 0) {
                    value = 0;
                }
                this.update(value);
            }
        }).bind(this));
        scene.appendChild(circle);
    };
    
    Text.prototype.draw = function () {
        var text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', this.point.x);
        text.setAttribute('y', this.point.y);
        text.innerHTML = this.body;
        scene.appendChild(text);
    };

    // SETUP
    var generateOutput = function () {
        state.output = [];
        var x = 10;
        var y = 400;
        var lineHeight = 20;
        
        var genOffsetText = function (str) {
            return new Text(new Point(x, y += lineHeight), str);
        };
        
        var objectsToText = function (objects) {
            return objects.map(function (x) {
                return x.serialize();
            }).map(function (s) {
                return genOffsetText(s);
            });
        };
        
        var rest = function (arr) {
            return arr.slice(1);
        };
        
        state.output = [genOffsetText("# Name x y")]
                            .concat(objectsToText(rest(state.nodes)))
                            .concat(genOffsetText("# Src Dst"))
                            .concat(objectsToText(rest(state.edges)));
    };
    
    var history = [];
    // TODO: store future
    
    var setState = function (newState) {
        
        history.push(Object.assign({}, state));
        console.log(history);
        for (var attr in newState) {
            state[attr] = newState[attr];
        }
        
        console.log(state);

        // clear scene
        Array.prototype.filter.call(scene.children, function (child) {
            return !child.classList.contains(classes.PRESERVE);
        }).map(function (child) {
            scene.removeChild(child);
        });
        
        // draw things
        state.edges.forEach(function (edge) {
            edge.draw();
        });
        state.nodes.forEach(function (node) {
            node.draw();
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
    var scrubber = new Scrubber();
    scrubber.draw();
    setState({
        nodes: [prototypeNode],
        edges: [prototypeEdge],
        mode: modes.INIT,
        newEdge: null,
        output: [],
    });
}

draw(document.getElementById('scene'));
