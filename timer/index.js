// setinterval
function displayTimeByInterval() {
  setInterval(function () {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById("demo-interval").textContent = time;
  }, 1000);
}
displayTimeByInterval();

// settimeout
function displayTimeByTimeout() {
  setTimeout(function run() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById("demo-timeout").textContent = time;
    setTimeout(run, 1000);
  }, 100);
}
displayTimeByTimeout();