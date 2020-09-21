for (let i = 0; i < 30; i++) {
  throttleUsingRaf(animationBalls);
  // animationBalls();
  // window.requestAnimationFrame(animationBalls);
}

function throttleUsingRaf(cb) {
  let rAfTimeout = null;

  return function () {
    if (rAfTimeout) {
      window.cancelAnimationFrame(rAfTimeout);
    }
    console.log();('======')
    rAfTimeout = window.requestAnimationFrame(function () {
      cb();
    });
  };
}

function scrollEventHandler() {
  const target = document.querySelector(".tab");

  // TODO: 스크롤이 빠르게 움직일때? 오차허용치가 필요함. 위아래 10정도로..
  const { top, bottom } = target.getBoundingClientRect();
  /* 
  뷰포트를 기준으로
  - 뷰포트 아래 위치: 
      타겟의 top값이 innerHeight 크다.
      타겟의 bottom값이 innerHeight 크다.
      스크롤하여 타겟의 top이 0보다 크고! innerHeight 작아질때 진입!
      스크롤하여 타겟의 top & bottom이 0보다 작아질때 벗어남!

  - 뷰포트 위에 위치:
      타겟의 top값이 0보다 작다.
      타겟의 bottom값이 0보다 작다.
      스크롤하여 타겟의 top은 0보다 작고! bottom이 0보다 클때 진입!
      스크롤하여 타겟의 top & bottom이 innerHeight보다 커질때 벗어남!
  */
  const PADDING = 250;
  // 뷰포트 아래 위치:
  const isInViewPortCase1 =
    top > 0 + PADDING && top < window.innerHeight - PADDING;
  const isNotInViewPortCase1 = top < 0 + PADDING && bottom < 0 + PADDING;

  // 뷰포트 위에 위치:
  const isInViewPortCase2 = top < 0 + PADDING && bottom > 0 + PADDING;
  const isNotInViewPortCase2 =
    top > window.innerHeight - PADDING && bottom > window.innerHeight - PADDING;

  if (isInViewPortCase1 || isInViewPortCase2) {
    // console.log("뷰포트 진입!");
    target.classList.add("active");

    animationBalls();
  }

  if (isNotInViewPortCase1 || isNotInViewPortCase2) {
    // console.log("뷰포트 밖...!");
    target.classList.remove("active");

    clearAnimationBalls();
  }
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
