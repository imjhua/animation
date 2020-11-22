const body = document.querySelector("body");
const checkbox = document.querySelector('input#modal[type="checkbox"]');
checkbox.addEventListener("change", function (e) {
  e.target.checked
    ? body.classList.add("active")
    : body.classList.remove("active");
});