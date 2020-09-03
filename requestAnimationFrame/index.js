// requestAnimationFrame
function test1() {
  const id = "#requestAnimationFrame";
  const target = document.querySelector(`${id}`);
  const img = document.querySelector(`${id} .img`);
  const button = document.querySelector(`${id} button`);

  let yPos = 0;
  let rafid;
  function render() {
    button.innerHTML = yPos;
    yPos += 1;

    img.style.transform = `translateY(${-yPos}px)`;

    // 어딘가를 클릭하면 멈추도록...
    if (yPos < innerHeight) {
      console.log(yPos);
      rafid = requestAnimationFrame(render);
    }
  }

  button.addEventListener("click", function (e) {
    // e.preventDefault();
    e.stopPropagation();
    // e.stopImmediatePropagation();
    render();
  });

  target.addEventListener("click", function () {
    cancelAnimationFrame(rafid);
  });
}

// animation
function test2() {
  const id = "#animation";
  const target = document.querySelector(`${id}`);
  const img = document.querySelector(`${id} .img`);
  const button = document.querySelector(`${id} button`);

  button.addEventListener("click", function (e) {
    // e.preventDefault();
    e.stopPropagation();
    // e.stopImmediatePropagation();

    if (!img.classList.contains("move")) {
      img.classList.add("move");
    }
    if (img.classList.contains("stop")) {
      img.classList.remove("stop");
    }
  });

  target.addEventListener("click", function () {
    img.classList.add("stop");
  });
}

test1();
test2();
