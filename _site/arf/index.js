/*
function raf(cb) {
  let rAFId = 0;
  return function () {
    if (rAFId) {
      cancelAnimationFrame(rAFId);
    }
    rAFId = requestAnimationFrame(cb);
  };
}

function inViewPort(el) {
  return el.classList.contains("show");
}
function show(el) {
  el.classList.add("show");
}

const checkViewPort = function () {
  const sections = document.querySelectorAll("section");
  for (const section of sections) {
    const { top } = section.getBoundingClientRect();

    // 뷰포트에 없고
    // 브라우저 창 전체 높이에서 30을 제외한 위치에서
    // 엘리먼트의 top이 들어 오는 경우
    // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
    if (!inViewPort(section) && top < window.innerHeight - 30) {
      show(section);
    }
  }
};

console.log("requestAnimationFrame(checkViewPort");
requestAnimationFrame(checkViewPort);

window.addEventListener(
  "scroll",
  raf(function () {
    checkViewPort();
  })
);

*/

function inViewPort(el) {
  return el.classList.contains("show");
}
function show(el) {
  el.classList.add("show");
}

let rAFId = 0;

const checkViewPort = function () {
  const sections = document.querySelectorAll("section");
  for (const section of sections) {
    const { top } = section.getBoundingClientRect();
    // 뷰포트에 없고
    // 브라우저 창 전체 높이에서 30을 제외한 위치에서
    // 엘리먼트의 top이 들어 오는 경우
    // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
    if (!inViewPort(section) && top < window.innerHeight - 30) {
      show(section);
    }

    if (rAFId) {
      cancelAnimationFrame(rAFId);
    }
    rAFId = requestAnimationFrame(checkViewPort);
  }
};

requestAnimationFrame(checkViewPort);
