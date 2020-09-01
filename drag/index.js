// 드랍 이벤트 호출: draggable(dragstart / drag) -> container(dragover / drop) -> draggable(dragend)

const draggable = document.querySelector("#target");

// draggable.addEventListener("drag", function (e) {
//   console.log("drag?");
// });
draggable.addEventListener("dragstart", function (e) {
  console.log("dragstart...");
  e.target.classList.add("dragging");

  const targetId = e.target.id; // draggable

  e.dataTransfer.setData("id", targetId);
});
draggable.addEventListener("dragend", function (e) {
  console.log("dragend...");
  e.target.classList.remove("dragging");
});

const container = document.querySelector(".container");
container.addEventListener("drop", function (e) {
  // dataTransfer 을 사용하려면 drop에서만. dragover에는 못받음
  console.log("drop?");
  e.preventDefault();

  var data = e.dataTransfer.getData("id");
  var target = document.getElementById(data);

  const container = e.target;
  container.appendChild(target);
});
container.addEventListener("dragover", function (e) {
  // dropover는 드랍영역에 그림자가 보여짐.
  console.log("drag over..!");
  e.preventDefault(); // 어야만 drop 이벤트가 발새한다.

  // const draggable = document.querySelector(".dragging");
  // container.appendChild(draggable);
});
