const img = document.getElementById("img");
const target = document.getElementById("target");
let yPos = 0;
let rafid;
function render() {
  target.innerHTML = yPos;
  yPos += 10;

  img.style.transform = `translateY(${-yPos}px)`;

  // 어딘가를 클릭하면 멈추도록...
  if (yPos < innerHeight) {
    rafid = requestAnimationFrame(render);
  }
}

render();

window.addEventListener("click", function () {
  cancelAnimationFrame(rafid);
});
