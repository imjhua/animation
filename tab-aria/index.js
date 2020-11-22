const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

for (let i = 0; i < tabs.length; ++i) {
  addListeners(i);
}

function addListeners(index) {
  tabs[index].addEventListener("click", clickEventListener);

  // Build an array with all tabs (<button>s) in it
  // tabs[index].index = index;
}

// When a tab is clicked, activateTab is fired to activate it
function clickEventListener(event) {
  var tab = event.target;
  activateTab(tab, false);
}

// Activates any given tab panel
function activateTab(tab, setFocus) {
  setFocus = setFocus || true;
  // Deactivate all other tabs
  deactivateTabs();

  // Remove tabindex attribute
  tab.removeAttribute("tabindex");

  // Set the tab as selected
  tab.setAttribute("aria-selected", "true");

  // Get the value of aria-controls (which is an ID)
  var controls = tab.getAttribute("aria-controls");

  // Remove hidden attribute from tab panel to make it visible
  document.getElementById(controls).removeAttribute("hidden");

  // Set focus when required
  if (setFocus) {
    tab.focus();
  }
}

// Deactivate all tabs and tab panels
function deactivateTabs() {
  for (t = 0; t < tabs.length; t++) {
    tabs[t].setAttribute("aria-selected", "false");
    // tabs[t].setAttribute("tabindex", "-1");
    // tabs[t].removeEventListener("focus", focusEventHandler);
  }

  for (p = 0; p < panels.length; p++) {
    panels[p].setAttribute("hidden", "hidden");
  }
}


activateTab(tabs[0]);