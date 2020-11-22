// 1초에 한번식 콘솔찍기
setInterval(function () {
  const count = document.getElementById("count");
  if(parseInt(count.textContent) < 30){
    animationBalls();
  }
}, 1000);


function throttleUsingRaf(cb) {
  let rAfTimeout = null;

  return function () {
    if (rAfTimeout) {
      window.cancelAnimationFrame(rAfTimeout);
    }
    rAfTimeout = window.requestAnimationFrame(function () {
      cb();
    });
  };
}


function clearAnimationBalls() {
  const list = document.getElementById("list");
  const count = document.getElementById("count");
  list.innerHTML = "";
  count.innerHTML = "0";
}

function animationBalls() {
  const count = document.getElementById("count");
  count.innerHTML = parseInt(count.textContent) + 1;

  const list = document.getElementById("list");
  const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
  const numBalls = 1;
  const balls = [];

  for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    list.append(ball);
  }

  // Keyframes
  balls.forEach((el, i, ra) => {
    let to = {
      x: Math.random() * (i % 2 === 0 ? -11 : 11),
      y: Math.random() * 12,
    };

    let anim = el.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` },
      ],
      {
        duration: (Math.random() + 1) * 2000, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
  });
}
