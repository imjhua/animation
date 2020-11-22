function inViewPort(el) {
  return el.classList.contains("show");
}
function show(el) {
  console.log("show");
  el.classList.add("show");
}

let rAFId = 0;

const checkViewPort = function () {
  const modules = document.querySelectorAll(".module");
  for (const module of modules) {
    const { top } = module.getBoundingClientRect();
    // 뷰포트에 없고
    // 브라우저 창 전체 높이에서 30을 제외한 위치에서
    // 엘리먼트의 top이 들어 오는 경우
    // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
    if (!inViewPort(module) && top < window.innerHeight - 100) {
      show(module);
    }

    if (rAFId) {
      cancelAnimationFrame(rAFId);
    }
    rAFId = requestAnimationFrame(checkViewPort);
  }
};

requestAnimationFrame(checkViewPort);

const title = document.querySelector("h2.title");
setTimeout(() => {
  title.classList.add("show");
}, 1000);



/* 
function inViewPort(el) {
  return el.classList.contains("show");
}
function show(el) {
  console.log("show");
  el.classList.add("show");
}


const checkViewPort = function () {
  const modules = document.querySelectorAll(".module");
  for (const module of modules) {
    const { top } = module.getBoundingClientRect();
    // 뷰포트에 없고
    // 브라우저 창 전체 높이에서 30을 제외한 위치에서
    // 엘리먼트의 top이 들어 오는 경우
    // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
    if (!inViewPort(module) && top < window.innerHeight - 100) {
      show(module);
    }
  }
};

checkViewPort();
window.addEventListener("scroll", checkViewPort);

const title = document.querySelector("h2.title");
setTimeout(() => {
  title.classList.add("show");
}, 1000);
 */