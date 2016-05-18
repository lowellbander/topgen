function draw(scene) {
   scene.onclick = function (e) {
       console.log("click");
   }
}

draw(document.getElementById('scene'));
