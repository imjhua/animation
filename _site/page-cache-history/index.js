const pushState = document.querySelector("#pushState");
pushState.addEventListener("click", function (e) {
  history.pushState({ data: "pushState" }, "", "/pushState");
});

const replaceState = document.querySelector("#replaceState");
replaceState.addEventListener("click", function (e) {
  history.replaceState({ data: "replaceState" }, "", "/replaceState");
});

const pageCache = document.querySelector("#pageCache");
pageCache.addEventListener("click", function (e) {
  history.pushState({ data: "pageCache" }, "", "/page-cache");
});

window.addEventListener("popstate", function () {
  console.log("popstate");
});

/* 
브라우저에서 뒤로가기 시 크롬을 제외한 브라우저에서는
Back Forward Cache 라는 브라우저의 뒤로가기시 브라우저가 단일 세션내에서
자바스크립트 상태 및 웹 페이지를 전체를 캐싱함으로써 전체적은 응답속도를 빠르게 동작하기위한 캐시가 사용된다.

이 캐시는 페이지에 대한 추가적인 로딩을 하지않고 자바스크립트의 상태까지 유지하고 있기 때문에
페이지 로딩시 반드시 한번 호출되어야 하는 자바스크립트가 있다면 호출되지 않기 때문에 문제가 발생할 수 있습니다.

뒤로가기를 통해 재진입한 경우!
- history back의 경우 추가적인 load이벤트가 발생하지 않기 때문에 pageshow이벤트를 활용해야 한다.

사파리에서 테스트하면 뒤로가기시 pageshow 이벤트만 발생함.
*/

window.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
});

window.addEventListener("load", function () {
  console.log("load");
});

window.addEventListener("pageshow", function () {
  console.log("pageshow");
});

window.addEventListener("pagehide", function () {
  console.log("pagehide");
});

window.addEventListener("unload", function () {
  console.log("unload");
});

// window.onpageshow = (event) => {
//   if (event.persisted === true) {
//     alert("BFCache 를 통해 페이지 전환");
//   } else {
//     alert("test");
//   }
// };
