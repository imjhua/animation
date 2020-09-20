let isIn = false;

window.addEventListener("scroll", function () {
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
  const isNotInViewPortCase1 =
    top < 0 + PADDING && bottom < 0 + PADDING;

  // 뷰포트 위에 위치:
  const isInViewPortCase2 = top < 0 + PADDING && bottom > 0 + PADDING;
  const isNotInViewPortCase2 =
    top > window.innerHeight - (PADDING) &&
    bottom > window.innerHeight - PADDING;

  if (isInViewPortCase1 || isInViewPortCase2) {
    console.log("뷰포트 진입!");
    target.classList.add("active");
  }

  if (isNotInViewPortCase1 || isNotInViewPortCase2) {
    console.log("뷰포트 밖...!");
    target.classList.remove("active");
  }
});
