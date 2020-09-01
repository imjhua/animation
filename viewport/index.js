/* 
뷰포트의 좌표: getBoundingClientRect.top
문서의 좌표: getBoundingClientRect.top + pageYOffset
*/

const target = document.getElementById("target");
// console.log(target.getBoundingClientRect());
// console.log(target.offsetParent);

/* 
- 뷰포트: innerWidth & innerHeight
- 해상도: window.screen.width & window.screen.height
*/

console.log(
  "window.innerWidth: ",
  window.innerWidth,
  "window.innerHeight: ",
  window.innerHeight,
  "window.screen.width: ",
  window.screen.width,
  "window.screen.height: ",
  window.screen.height
);

let isIn = false;
window.addEventListener("scroll", function (e) {
  console.log(
    "getBoundingClientRect: ",
    target.getBoundingClientRect().top,
    "pageYOffset",
    window.pageYOffset // 스크롤을 해당 px만큼 움직였다. 스크롤한 정도를 의미
  );

  /* 
  뷰포트를 기준으로 타겟엘리먼트가 얼마만큼 떨어져있는가는
  getBoundingClientRect.top를 통해 알 수 있다.

  타겟 엘리먼트가.. 뷰포트에 진입한 떄는?
  getBoundingClientRect.top이 뷰포트 높이와 같은 때!!
  이때 뷰포트 높이는,

  - 뷰포트: innerWidth & innerHeight
  - 해상도: window.screen.width & window.screen.height
  */

  /* 
  스크롤을 할 수록 
  - getBoundingClientRect.top은 작아지고.. ->  뷰포트와 가까워지고
  - pageYOffset은 커진다. -> 브라우저 절대좌표 최상단과는 멀어진다.
  */

  // 빼꼼 구간에서 진입하기.
  // 뺴꼼은.. 엘리먼트 시작 전 50 & 시작 후 50

  const padding = 10;
  const startPoint = target.getBoundingClientRect().top - padding;
  const endPoint = target.getBoundingClientRect().top + padding;

  // 같은지만 체크하면 스크롤이 너무 빨리 움직일때 px를 건너 뛸 수 있다.
  // 어느정도 값의 허용치? 범위를 구해놓아야 함.
  const isInViewPort =
    // window.innerHeight === target.getBoundingClientRect().top;
    startPoint < window.innerHeight && window.innerHeight < endPoint;

  if (!isIn && isInViewPort) {
    console.log("진입!");
    isIn = true;

    target.classList.add('animation')
  }
});

function init() {
  setInterval(() => {
    // 0이라면? 뷰포트 즉, 브라우저 맨 위에 딱 붙어있는 상태가 된다.
    // offsetParent은 body...
    // 스크롤을 한다고 해서 body의 위치가 변하는 것이 아닌데
    // 왜 top이 줄어들지?
    // offsetParent의 기준은 상관없나??

    // window.pageYOffset 는 브라우저이다.
    console.log(
      "getBoundingClientRect: ",
      target.getBoundingClientRect().top,
      "pageYOffset",
      window.pageYOffset // 스크롤을 해당 px만큼 움직였다. 스크롤한 정도를 의미
    );
  }, 1000);
}
