window.addEventListener("scroll", () => {
  const dts = document.querySelectorAll("dt");

  for (const dt of dts) {
    // 뷰포트 진입시
    const inViewPortCallback = () => dt.classList.add("fixed");
    // 뷰포트 빠져나옴
    const notInViewPortCallback = () => dt.classList.remove("fixed");

    checkViewPort(dt, inViewPortCallback, notInViewPortCallback);
  }
});

const PADDING = 0;
function checkViewPort(target, inViewPortCallback, notInViewPortCallback) {
  const { top, bottom } = target.getBoundingClientRect();

  /*  
  80은 h1 의 content + margin 높이
  스크롤 할 수록
  - pageYOffset은 커진다.
  - top은 작아진다. 상단에 엘리먼트가 있다면 높이만큼 더해서 비교한다.
  */

  if (window.pageYOffset > top + 15) {
    inViewPortCallback();
  } else {
    notInViewPortCallback();
  }
}
