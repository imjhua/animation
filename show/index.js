
/* opacity 0 영역은 클릭이 됨 */
const opacity = document.querySelector("#opacity");
opacity.addEventListener("click", () => {
  console.log("opacity");
});
const visibility = document.querySelector("#visibility");
visibility.addEventListener("click", () => {
  console.log("visibility");
});
const display = document.querySelector("#display");
display.addEventListener("click", () => {
  console.log("display");
});