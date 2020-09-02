const img = document.getElementById("img");
const target = document.getElementById("target");
let yPos = 0;
function render() {
  target.innerHTML = yPos;
  yPos += 10;

  img.style.transform = `translateY(${-yPos}px)`;

  if (yPos < innerHeight) {
    requestAnimationFrame(render);
  }
}

render();
