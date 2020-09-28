/* 
Element.scrollIntoView(alignToTop : boolean)메소드를 사용하면,
스크롤 가능한 요소의 스크롤을 부모 요소의 표시영역 기준으로 이동시킬 수 있.
*/

function myFunction() {
  var elmnt = document.getElementById("content");
  elmnt.scrollIntoView();
}
