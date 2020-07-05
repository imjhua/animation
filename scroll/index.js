(function () {
  window.addEventListener("load", init);
  window.addEventListener("resize", init);
  window.addEventListener("scroll", function () {
    setCurrentPageInfo();
    playAnimation();
  });

  // global variable
  const PAGE_IDS_FOR_SCROLL = [0, 2, 3];
  const HEIGHT_SIZE_X = 5;
  const PAGE_HEIGHT = window.innerHeight * HEIGHT_SIZE_X;

  let g_pageSize = 0;
  let g_currentPageId = 0;
  let g_currentYOffset = null;
  let g_endPageOffsetList = [];

  function init() {
    /* 
    박스크기를 설정할 때, 원하는 크기를 얻기 위해 테두리(border)나 안쪽 여백(padding)을 고려해야하는데, 이러한 예측을 쉽게 하고자 테두리를 포함한 크기(테두리를 기준으로 박스크기 계산)를 미리 지정하였다.
    - box-sizing: border-box; 
    */

    const sections = Array.from(document.querySelectorAll("section") || []);
    let endPageOffset = 0;
    for (const section of sections) {
      for (let id of PAGE_IDS_FOR_SCROLL) {
        if (section.classList.contains(`page-${id}`)) {
          section.style.height = `${window.innerHeight * HEIGHT_SIZE_X}px`;
        }
      }

      endPageOffset += section.offsetHeight;
      g_endPageOffsetList.push(endPageOffset);
      g_pageSize++;
    }

    setCurrentPageInfo();
  }

  function setCurrentPageInfo() {
    /* 
  offset 값으로 속한 범위(currentPageId)를 구하고자 할떄,
  범위의 임계치가 되는 기준에 준하면 해당 범위로 특정한다.
  임계치가 넘으면 다음 범위에서 확인..
  */

    // // flag 대신 else if 구문을 사용 할 수 있다.
    // let flag = true;
    // if (flag && window.pageYOffset < g_endPageOffsetList[0]) {
    //   g_currentPageId = 0;
    //   flag = false;
    // }
    // if (flag && window.pageYOffset < g_endPageOffsetList[1]) {
    //   g_currentPageId = 1;
    //   flag = false;
    // }
    // if (flag && window.pageYOffset < g_endPageOffsetList[2]) {
    //   g_currentPageId = 2;
    //   flag = false;
    // }

    let flag = true;
    for (let i = 0; i < g_pageSize; i++) {
      const endPageOffset = g_endPageOffsetList[i];
      if (flag && window.pageYOffset < endPageOffset) {
        const startPageOffset = i === 0 ? 0 : g_endPageOffsetList[i - 1];
        g_currentYOffset = window.pageYOffset - startPageOffset;
        g_currentPageId = i;
        flag = false;
      }
    }
  }

  // const pageObj = {};
  const pageObj = {
    0: [
      {
        classSelector: "canvas",
        animationFrameRange: [0, 1],
        style: { dir: "001", imageId: [6726, 6726 + 300] },
      },
      // {
      //   classSelector: "canvas",
      //   animationFrameRange: [0.9, 1],
      //   style: { opacity: [1, 0] },
      // },
      {
        classSelector: "message-0",
        animationFrameRange: [0.1, 0.25],
        style: { opacity: [0, 1], translateY: [0, -20] },
      },
      {
        classSelector: "message-1",
        animationFrameRange: [0.3, 0.45],
        style: { opacity: [0, 1], translateY: [0, -20] },
      },
      {
        classSelector: "message-2",
        animationFrameRange: [0.5, 0.65],
        style: { opacity: [0, 1], translateY: [0, -20] },
      },
      {
        classSelector: "message-3",
        animationFrameRange: [0.7, 0.85],
        style: { opacity: [0, 1], translateY: [0, -20] },
      },
    ],
    2: [
      {
        classSelector: "canvas",
        animationFrameRange: [0, 1],
        style: { dir: "002", imageId: [7026, 7026 + 960] },
      },
      // {
      //   classSelector: "canvas",
      //   animationFrameRange: [0.9, 1],
      //   style: { opacity: [1, 0] },
      // },
      {
        classSelector: "message-0",
        animationFrameRange: [0.1, 0.25],
        style: { opacity: [0, 1], translateY: [0, -20] },
      },
      {
        classSelector: "message-1",
        animationFrameRange: [0.3, 0.55],
        style: { opacity: [0, 1], translateY: [0, -30] },
      },
      {
        classSelector: "message-1 .pin",
        animationFrameRange: [0.3, 0.55],
        style: { opacity: [0, 1], scaleY: [50, 100] },
      },
      {
        classSelector: "message-2",
        animationFrameRange: [0.65, 0.85],
        style: { opacity: [0, 1], translateY: [0, -30] },
      },
      {
        classSelector: "message-2 .pin",
        animationFrameRange: [0.65, 0.85],
        style: { opacity: [0, 1], scaleY: [50, 100] },
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
    if (g_currentPageId === 0 && window.pageYOffset === 0) {
      const stickyEls = document.querySelectorAll(`.sticky`);
      for (const stickyEl of stickyEls) {
        stickyEl.style.opacity = 0;
      }
      return;
    }

    const targets = pageObj[g_currentPageId] || [];
    for (const { classSelector, animationFrameRange, style } of targets) {
      const element = document.querySelector(
        `.page-${g_currentPageId} .${classSelector}`
      );
      if (!element) return;

      /* 
      - 값의 범위와 애니메이션 구간을 혼동하지 말것!
      - 값의 변화와 구간의 변화를 나눠서 구해야해.
      */

      // 애니메이션 구간의 시작과 끝 구하기
      const [start, end] = animationFrameRange;
      const startY = start * PAGE_HEIGHT;
      const endY = end * PAGE_HEIGHT;
      const rangeY = endY - startY;
      const middleY = startY + rangeY / 2;

      // const scrollRatio = g_currentYOffset / PAGE_HEIGHT; // 전체페이지를 기준으로 스크롤 비율
      // 애니메이션 시작부터의 종료까지 구간을 기준으로 스크롤 비율
      const scrollRatioByAnimationRange =
        Math.round(((g_currentYOffset - startY) / rangeY) * 100) / 100;

      // init
      if (scrollRatioByAnimationRange < 0) return;

      if (startY - 100 < g_currentYOffset && g_currentYOffset < endY + 100) {
        // opacity
        if (style.hasOwnProperty("opacity")) {
          let opacityValue = calculatorScrollRatioValue(
            style.opacity,
            scrollRatioByAnimationRange
          );

          if (g_currentYOffset > middleY) {
            opacityValue = 1 - opacityValue;
          }

          element.style.opacity = opacityValue * 2;
        }

        // translateY
        if (style.hasOwnProperty("translateY")) {
          const translateY = calculatorScrollRatioValue(
            style.translateY,
            scrollRatioByAnimationRange
          );
          element.style.transform = `translate3d(0, ${translateY}%, 0)`;
        }

        // scaleY
        if (style.hasOwnProperty("scaleY")) {
          const scaleY = calculatorScrollRatioValue(
            style.scaleY,
            scrollRatioByAnimationRange
          );
          element.style.transform = `scaleY(${scaleY / 100})`;
        }

        // canvas
        // IMG_7025
        if (style.hasOwnProperty("imageId")) {
          const imageId = Math.round(
            calculatorScrollRatioValue(
              style.imageId,
              scrollRatioByAnimationRange
            )
          );
          const ctx = element.getContext("2d");
          const img = new Image();
          img.onload = function () {
            ctx.drawImage(img, 0, 0);
          };
          img.src = `./video/${style.dir}/IMG_${imageId}.JPG`;
        }
      }
    }
  }
})();
