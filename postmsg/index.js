function openWindowPopup(url = "") {
  const windowName = "AddressList Popup"; // _blank
  const windowFeatures =
    "width=800,height=600,top=20,left=900,location=no,resizable=yes,scrollbars=yes,status=no";

  const win = window.open(url, windowName, windowFeatures);

  return win;
}

let popup1 = null;
const openPopup = () => {
  popup1 = openWindowPopup("/test");
  // test자식 페이지에서는 window.opener.postMessage('test', '*');
  // 이때 IE에서 전송하는 opener가 정상동작하지 않는다.
  // Window 인터페이스의 opener 속성은 open()을 사용해 현재 창을 열었던 창의 참조를 반환합니다.

  // opener인경우 window
  function receiveMessage1(e) {
    console.log("message!");
    popup1.close();
    window.removeEventListener("message", receiveMessage1);
  }

  window.addEventListener("message", receiveMessage1, false);
};
////////////////

let popup2 = null;
const openPopupByIframe = () => {
  popup2 = openWindowPopup();
  const html = `<html>
                <meta http-equiv="X-UA-Compatible" content="IE=10">
                <iframe src=${"/test"} width="100%" height="100%" style="border: 0;"></iframe>
                </html>`;
  // test자식 페이지에서는 window.parent.postMessage('test', '*');
  // 이때 IE에서 전송하는 message는 obj파싱되지 않는 제약이 있다.
  // Window.parent속성 현재 윈도우 또는 서브 프레임의 상위에 대한 참조이다.
  // 윈도우에 부모가없는 경우 해당 parent속성은 자체에 대한 참조입니다.
  // 윈도우가 넣었을 경우 <iframe>, <object>또는 <frame>, 그 부모 윈도우 매립 요소 창이다.

  popup2.document.write(html);

  // parent인 경우 반환받은 win
  function receiveMessage2(e) {
    console.log("message!");
    popup2.close();
    popup2.removeEventListener("message", receiveMessage2);
  }

  popup2.addEventListener("message", receiveMessage2, false);
};
