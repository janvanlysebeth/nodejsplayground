(function () {
  var a = [];
  function stash(x) {
    a.push(x);
  }
  function report() {
    console.log("this is the stash: " + a);
  }
  function reset() {
    a = [];
  }
  window.stash = stash;
  window.report = report;
  window.reset = reset;
})();

window.report();
window.stash("x");
window.report();
window.reset();
window.report();