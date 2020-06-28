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
      style: { opacityBlock: [0.1, 0.2], translateY: [0, 1] },
    },
    {
      classSelector: "message-2",
      style: { opacityBlock: [0.3, 0.4], translateY: [0, 1] },
    },
    {
      classSelector: "message-3",
      style: { opacityBlock: [0.5, 0.6], translateY: [0, 1] },
    },
    {
      classSelector: "message-4",
      style: { opacityBlock: [0.7, 0.8], translateY: [0, 1] },
    },
  ],
  // 2: [
  //   {
  //     classSelector: "message-1",
  //     style: { opacityBlock: [0.1, 0.2], translateY: [0, 1] },
  //   },
  // ],
  // 3: [
  //   {
  //     classSelector: "message-1",
  //     style: { opacityBlock: [0.1, 0.2], translateY: [0, 1] },
  //   },
  // ],
};
function playAnimation() {
  const targets = pageObj[currentPageId];
  if (!targets) return;

  for (const target of targets) {
    const element = document.querySelector(
      `#show-page-${currentPageId} .${target.classSelector}`
    );
    if (!element) return;

    const [start, end] = target.style.opacityBlock;
    const startY = start * pageHeight;
    const endY = end * pageHeight;
    const range = endY - startY;
    const middleY = startY + range / 2;

    let opacityValue = 0;
    if (currentYOffset > startY) {
      opacityValue = (currentYOffset - startY) / range;
    }
    if (currentYOffset > middleY) {
      opacityValue = 1 - opacityValue;
    }
    if (currentYOffset > endY) {
      opacityValue = 0;
    }

    if (element) {
      element.style.opacity = opacityValue * 2;
    }
  }
}
