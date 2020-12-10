/*  
// https://csstriggers.com/
// https://trendyminds.com/blog/silky-css-minimizing-repaints-jank
// https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
// https://medium.com/@paul_irish/requestanimationframe-scheduling-for-nerds-9c57f7438ef4
// https://m.blog.naver.com/PostView.nhn?blogId=dndlab&logNo=221633637425&proxyReferer=https:%2F%2Fwww.google.com%2F
// https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC
// https://12bme.tistory.com/140

[requestAnimationFrame] ->  브라우저가 초당 렌더링하는 횟수를 보장
: 비동기 함수이다. 브라우저가 실행 시기를 결정한다. 스스로 반복해서 호출하지 않는다.
 스스로를 반복 호출하지 않기 때문에 window.requestAnimationFrame 함수로 다음 함수를 반복하려면, 
 재귀적으로 window.requestAnimationFrame 함수를 다시 호출해 주어야 한다.
 - setTimeout은 tast queue에 stack 쌓임
 - requestAnimationFrame: animation frames 라는 queue에 stack 쌓임(task보다 먼저 실행됨)
 ------
 [함수 호출]
 브라우저에게 수행하기를 원하는 애니메이션을 알리고,
 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출한다.
 따라서 인자는! 리페인트 이전에 실행할 콜백이어야 한다.
 ------
[스타일 속성 예]
 - repaint: background-color
 - reflow: height

 화면에 새로운 애니메이션을 업데이트할 준비가 될때마다 이 메소드를 호출하는것이 좋습니다. 
 이는 브라우저가 다음 리페인트를 수행하기전에 호출된 애니메이션 함수를 요청합니다. 
 콜백의 수는 보통 1초에 60회지만, 일반적으로 대부분의 브라우저에서는 W3C 권장사항에 따라 그 수가 디스플레이 주사율과 일치하게됩니다. 
*/

// getBoundingClientRect는 브라우저의 리플로 최적화 실행을 중단하고
// 추가적인 리플로를 발생시키는 것으로 알려진 객체의 속성과 메서드 중 하나이다.
// 따라서 최적화 대상!

//12bme.tistory.com/140 [길은 가면, 뒤에 있다.]
// requestAnimationFrame을 사용한 스크롤이벤트 적용

window.addEventListener("scrolll", throttleUsingRaf(scrollEventHandler));
function throttleUsingRaf(cb) {
  let rAfTimeout = null;

  return function () {
    if (rAfTimeout) {
      window.cancelAnimationFrame(rAfTimeout);
    }
    rAfTimeout = window.requestAnimationFrame(cb);
    // rAfTimeout = window.requestAnimationFrame(function () {
    //   cb();
    // });
  };
}
// passive 옵션적용하여 스크롤성능향상
// 옵션은..
// https://amati.io/eventlisteneroptions-passive-true/
// https://developers.google.com/web/fundamentals/performance/rendering?hl=ko
window.addEventListener("scroll", scrollEventHandler, { passive: true });
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
