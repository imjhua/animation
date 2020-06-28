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
      style: { opacity: [0, 1], translateY: [0, 20] },
    },
    {
      classSelector: "message-2",
      animationFrameRange: [0.3, 0.4],
      style: { opacity: [0, 1], translateY: [0, 20] },
    },
    {
      classSelector: "message-3",
      animationFrameRange: [0.5, 0.6],
      style: { opacity: [0, 1], translateY: [0, 20] },
    },
    {
      classSelector: "message-4",
      animationFrameRange: [0.7, 0.8],
      style: { opacity: [0, 1], translateY: [0, 20] },
    },
  ],
};

// 스크롤 비율에 대한.. opacity값의 시작과 끝 구하기
function calculatorScrollRatioValue(styleValue, scrollRatioByAnimationRange) {
  const [start, end] = styleValue;
  const range = end - start;

  return scrollRatioByAnimationRange * range + start;
}

function playAnimation() {
  // 값의 범위와 애니메이션 구간을 혼동하지 말것!
  // 값의 변화와 구간의 변화를 나눠서 구해야해.
  const scrollRatio = currentYOffset / pageHeight; // 전체페이지를 기준으로 스크롤 비율

  const targets = pageObj[currentPageId] || [];
  for (const { classSelector, animationFrameRange, style } of targets) {
    const element = document.querySelector(
      `#show-page-${currentPageId} .${classSelector}`
    );
    if (!element) return;

    // 애니메이션 구간의 시작과 끝 구하기
    const [start, end] = animationFrameRange;
    const startY = start * pageHeight;
    const endY = end * pageHeight;
    const rangeY = endY - startY;
    const middleY = startY + rangeY / 2;

    // 애니메이션 시작부터의 종료까지 구간을 기준으로 스크롤 비율
    const scrollRatioByAnimationRange = (currentYOffset - startY) / rangeY;

    if (style.hasOwnProperty("opacity")) {
      let opacityValue = 0;
      if (startY < currentYOffset && currentYOffset < endY) {
        if (currentYOffset > startY) {
          opacityValue = calculatorScrollRatioValue(
            style.opacity,
            scrollRatioByAnimationRange
          );
        }
        if (currentYOffset > middleY) {
          opacityValue = 1 - opacityValue;
        }
      }
      element.style.opacity = opacityValue * 2;
    }
    if (style.hasOwnProperty("translateY")) {
      let translateY = 0;
      if (startY < currentYOffset && currentYOffset < endY) {
        if (currentYOffset > startY) {
          translateY = calculatorScrollRatioValue(
            style.translateY,
            scrollRatioByAnimationRange
          );
        }
      }

      element.style.transform = `translate3d(0, -${translateY}%, 0)`;
    }
  }
}
