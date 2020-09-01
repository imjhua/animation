console.log('test')
  // const handleClickIE9 = (e: Event) => {
  //   e.stopPropagation();
  //   const win = openWindowPopup();
  //   const html = `<html>
  //                 <meta http-equiv="X-UA-Compatible" content="IE=9">
  //                 <iframe src=${ADDRESS_LIST_URL} width="100%" height="100%"></iframe>
  //                 </html>`;

  //   win?.document.write(html);

  //   win?.addEventListener('message', receiveMessage, false);
  //   function receiveMessage() {
  //     // TODO: 메세지 받으면 데이터 패치
  //     setReceiveData(true);
  //     win?.close();
  //   }
  // };

  // const handleClick = (e: Event) => {
  //   e.stopPropagation();
  //   const win = openWindowPopup(ADDRESS_LIST_URL);

  //   window.addEventListener('message', receiveMessage, false);
  //   function receiveMessage() {
  //     // TODO: 메세지 받으면 데이터 패치
  //     setReceiveData(true);
  //     win?.close();
  //   }



  //   const handleClick = () => {
  //     // window.parent.postMessage(text, '*');
  //     window.opener.postMessage('send message!', '*');
  //   };
  