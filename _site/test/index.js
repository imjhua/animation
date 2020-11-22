// URL: /test 담당
function postMsg(){
  console.log('postMsg!');
  if(window.opener) window.opener.postMessage('test (by opener)', '*');
  if(window.parent) window.parent.postMessage('test (by parent)', '*');
}




var nodes = document.querySelector("ul#ul1");

for (var k = 0; k < nodes.children.length; k++) {
  var el = nodes.children[k]; // el은 하나씩 할당된다.
  el.onclick = function (e) {
    e.target.style.backgroundColor = "yellow";
    console.log(k);
  };

  setTimeout(function () {
    console.log(k);
  }, 1000);
}

var nodes = document.querySelector("ul#ul2");

for (let k = 0; k < nodes.children.length; k++) {
  var el = nodes.children[k]; // el은 하나씩 할당된다.
  el.onclick = function (e) {
    e.target.style.backgroundColor = "green";
    console.log(k);
  };

  setTimeout(function () {
    console.log(k);
  }, 2000);
}
