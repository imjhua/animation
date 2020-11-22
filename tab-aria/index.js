const action = document.querySelector(".action");

action.addEventListener("click", clickEventListener);

const input = document.querySelector("input");
function clickEventListener(event) {
  const data = event.target.dataset["name"];
  switch (data) {
    case "minus":
      if (input.value > 0) {
        input.value--;
      }
      break;
    case "plus":
      input.value++;
      break;
    case "add":
      alert(`${input.value}개 담았다!`);
      input.value = 0;
      break;
    default:
      break;
  }

  /* 
  
  const dataSet = (target as HTMLElementTabMenu).dataset;
    setSelectedTabPanId(dataSet.panelId);
    dispatch(fetchBest100(parseInt(dataSet.uniqueId, 10)));
    */
}
