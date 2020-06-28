window.addEventListener("load", function () {
  init();
  setBodyPageId();
});

window.addEventListener("resize", function () {
  init();
  setBodyPageId();
});

window.addEventListener("scroll", function () {
  setBodyPageId();
  playAnimation();
});

// global variable
const PAGE_IDS_FOR_SCROLL = [0, 1, 2, 3];
const HEIGHT_SIZE = 5;
let currentPageId = 0;
let pageHeight = null;
let pageHeightForPrev = 0;
let currentYOffset = null;

function init() {
  // setPageHeight
  pageHeight = window.innerHeight * HEIGHT_SIZE;

  for (let id of PAGE_IDS_FOR_SCROLL) {
    // style의 hegith를 주는 것은 elemnet의 Height와는 다른 것이다! ->  box-sizing: border-box; 해결?
    // box-sizing를 border-box로 지정하면,
    // 테두리를 포함한 크기(테두리를 기준으로 크기를 함)를 지정할 수 있기 때문에 예측하기가 더 쉽다.
    // 엘리먼트의 전체 크기 (border + padding + height)
    document.querySelector(
      `section.page-${id}`
    ).style.height = `${pageHeight}px`;
  }
}

function setBodyPageId() {
  currentPageId = Math.floor(window.pageYOffset / pageHeight);
  document.body.setAttribute("id", `show-page-${currentPageId}`);

  // 엘리먼트의 전체 크기 (border + padding + height)
  // elementHeight = pageHeight; // paddng-top
  pageAccumulatedHeight = pageHeight * currentPageId;
  currentYOffset = pageYOffset - pageAccumulatedHeight;
}

const pageObj = {
  0: [
    {
      classSelector: "message-1",
      animationFrameRange: [0.1, 0.2],
      style: { opacity: [0, 1], translateY: [0.1, 0.2] },
    },
    {
      classSelector: "message-2",
      animationFrameRange: [0.3, 0.4],
      style: { opacity: [0, 1], translateY: [0, 1] },
    },
  ],
};
function playAnimation() {
  // 값의 범위와 애니메이션 구간을 혼동하지 말것!
  // 값의 변화와 구간의 변화를 나눠서 구해야해.
  const scrollRatio = currentYOffset / pageHeight; // 값의 범위

  const targets = pageObj[currentPageId] || [];
  for (const { classSelector, animationFrameRange, style } of targets) {
    // 애니메이션 구간의 시작과 끝 구하기
    const [start, end] = animationFrameRange;
    const startY = start * pageHeight;
    const endY = end * pageHeight;
    const rangeY = endY - startY;

    let opacityValueByRangeY = 0;
    if (style.hasOwnProperty("opacity")) {
      // 스크롤 비율에 대한.. opacity값의 시작과 끝 구하기
      const [start, end] = style.opacity;
      const range = end - start;
      // const middle = start + range / 2;

      // 전체 페이지 기준으로 스크롤 비율에 대한 opacityValue
      const opacityValue = scrollRatio * range + start;

      console.log(opacityValue);

      // 애니메이션 구간에 해당하는 비율로 재계산 (애니메이션 구간을 곱해주면 됨)
      // opacityValueByRangeY = opacityValue * rangeY;
      // console.log(opacityValueByRangeY)

      // console.log(rangeY / pageHeight)
      // console.log(opacityValueByRangeY)

      if (currentYOffset < rangeY) {
        // console.log(opacityValue);
        // console.log(opacityValueByRangeY);
      }

      // console.log(opacityValueByRangeY)
    }

    // currentYOffset 기준으로 animationFrameRange(애니메이션 구간)에 해당하는 경우만 el의 style을 업데이트한다.
    // if (startY < currentYOffset && currentYOffset < endY) {
    //   const element = document.querySelector(
    //     `#show-page-${currentPageId} .${classSelector}`
    //   );
    //   if (!element) return;

    //   element.style.opacity = opacityValueByRangeY;
    //   // if (opacityValue) {
    //   // }

    //   // if (style.hasOwnProperty("opacity")) {
    //   //   // opacity값의 시작과 끝 구하기
    //   //   const [start, end] = style.opacity;
    //   //   const range = end - start;
    //   //   // const middle = start + range / 2;

    //   //   let opacityValue = 0;
    //   //   // console.log(range)
    //   //   if (startY < currentYOffset) {
    //   //     opacityValue = scrollRatio * range;
    //   //     console.log(opacityValue);
    //   //   }
    //   //   // if (currentYOffset > middleY) {
    //   //   //   opacityValue = 1 - opacityValue;
    //   //   // }
    //   //   // element.style.opacity = opacityValue * 2;
    //   // }
    // }
    /*
    if (style.hasOwnProperty("opacity")) {
      const [start, end] = style.opacity;
      const startY = start * pageHeight;
      const endY = end * pageHeight;
      const range = endY - startY;
      const middleY = startY + range / 2;

      let opacityValue = 0;
      if (startY < currentYOffset && currentYOffset < endY) {
        if (currentYOffset > startY) {
          opacityValue = (currentYOffset - startY) / range;
        }
        if (currentYOffset > middleY) {
          opacityValue = 1 - opacityValue;
        }
      }
      element.style.opacity = opacityValue * 2;
    }
    if (style.hasOwnProperty("translateY")) {
      const [start, end] = style.translateY;
      const startY = start * pageHeight;
      const endY = end * pageHeight;
      const range = endY - startY;

      let translateY = 0;
      if (startY < currentYOffset && currentYOffset < endY) {
        if (currentYOffset > startY) {
          // 스크롤비율 - 범위 시작 값 * 변화하는 값의 범위
          translateY = (scrollRatio - start) * 0.2 * 1000;
        }
      }

      element.style.transform = `translate3d(0, -${translateY}%, 0)`;
    }
    */
  }
}
