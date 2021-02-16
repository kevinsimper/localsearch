// ==UserScript==
// @name            Localsearch Track
// @include         http://www.google.*
// @include         https://www.google.*
// @include         https://encrypted.google.*
// @run-at          document-start
// @license         MIT
// @noframes
// ==/UserScript==

if (location.href.indexOf("tbm=isch") !== -1)
  // NOTE: Don't run on image search
  return;
if (window.top !== window.self)
  // NOTE: Do not run on iframes
  return;

function handler(elementClicked) {
  const urlclicked = elementClicked.target.closest("a").getAttribute("href");
  fetch("http://localhost:8000/track?q=" + encodeURIComponent(urlclicked));
}

document.addEventListener(
  "click",
  function (e) {
    // loop parent nodes from the target to the delegation node
    for (
      var target = e.target;
      target && target != this;
      target = target.parentNode
    ) {
      if (target.matches(".yuRUbf a")) {
        handler.call(target, e);
        break;
      }
    }
  },
  false
);
