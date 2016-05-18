var state = {};

var setState = function (newState) {
    state = newState;
}

var node = {};

var SVG_NS = 'http://www.w3.org/2000/svg';

function draw(scene) {
   scene.onclick = function (e) {
       var element = document.createElementNS(SVG_NS, 'circle');
       element.setAttribute('cx', (e.clientX - 20).toString());
       element.setAttribute('cy', (e.clientY - 20).toString());
       element.setAttribute('r', '5');
       scene.appendChild(element);
   }
}

draw(document.getElementById('scene'));
