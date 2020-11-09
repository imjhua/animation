const body = document.querySelector("body");
const checkbox = document.querySelector('input#modal[type="checkbox"]');
checkbox.addEventListener("change", function (e) {
  e.target.checked
    ? body.classList.add("active")
    : body.classList.remove("active");
});

// TODO!!

/*  
모달이 열리면 뒤쪽의 메인 컨텐츠는 스크롤되지 않기를 기대한다.
body {
  overflow: hidden;
}

*/
/* 
윈도우에서 스크롤바가 사라지면서 페이지의 폭이 바뀌기 때문에, 100% 폭을 가진 컨텐츠는 모달이 열리면서 순간적으로 보기싫게 움직인다(jitter). 
스크롤바가 없어지더라도 기존 페이지의 폭을 보존해주고 싶은데, 문제는 브라우저마다 스크롤바 스타일이 다 다르고 폭도 다르다는 것이다. 스크롤바 폭을 동적으로 계산하는 방법도 있지만 DOM을 조작해야 해서 좋지 않은 방법이다.
다른 방법은 항상 스크롤바가 유지되게 하는 것이다.
html {
  overflow-y: scroll;
}


이렇게 하면 jitter가 사라지는 대신, 
눈에는 보이지만 움직일 수 없는 스크롤바가 보여서 좋은 디자인은 아니다.
더 좋은 방법은 스크롤바는 유지하되 눈에만 안보이게 하는 것이다.
// Chrome, Safari, Opera
.container::-webkit-scrollbar {
    display: none;
}
  
// IE, Edge
.container {
    -ms-overflow-style: none;
}
현재까지는 파이어폭스는 방법이 없다. 보다시피 모든 상황에 들어맞는 해결책은 없으며 적당히 장단점을 고려하여 취할 수밖에 없다.
*/

/*
부드러운 스크롤 동작.
전체 페이지에서 스크롤 동작을 바꿀 수 있다.
html {
    scroll-behavior: smooth;
}
*/
