window.addEventListener('scroll', throttle(() => {
  const scrollTop = window.scrollY;
  /* doSomething with scrollTop */
  animationBalls();
}));
  
function throttle(action, wait = 1000) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
        action();
        time = Date.now();
    }
  }
}
  
// smoother version
function throttleArf(action) {
  let isRunning = false;
  return function() {
    if (isRunning) return;
    isRunning = true;
    window.requestAnimationFrame(() => {
      action();
      isRunning = false;
    });
  }
}



function animationBalls() {
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