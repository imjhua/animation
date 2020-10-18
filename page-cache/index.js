/* 
Back Forward Cache 란 브라우저의 뒤로가기시 브라우저가 단일 세션내에서
자바스크립트 상태 및 웹 페이지를 전체를 캐싱함으로써 전체적은 응답속도를 빠르게 동작하기위해
사용되는 캐시입니다.
이 캐시는 페이지에 대한 추가적인 로딩을 하지않고 자바스크립트 상태 까지 유지하고 있기 때문에
페이지 로딩시 반드시 한번 호출되어야 하는 자바스크립트가 있다면 호출되지 않기 때문에 문제가 발생할 수 있습니다.
*/

window.addEventListener("load", function () {
  console.log("load");
});

window.addEventListener("unload", function () {
  console.log("unload");
});

window.addEventListener('pageshow', function(){
  console.log('pageshow');
});

window.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
});

// window.onpageshow = (event) => {
//   if (event.persisted === true) {
//     alert("BFCache 를 통해 페이지 전환");
//   } else {
//     alert("test");
//   }
// };
