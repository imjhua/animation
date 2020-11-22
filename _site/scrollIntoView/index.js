/* 
옵션을 통해 기준점을 맞출 수 있다.
- behavior: 전환에니메이션 auto, smooth
- block: 수직 정렬을 정의 start, center, end, nearest
- inline: 수평 정렬을 정함 start, center, end, nearest
*/

function myFunction() {
  var elmnt = document.getElementById("inner");
  elmnt.scrollIntoView({ block: "end" });
}
