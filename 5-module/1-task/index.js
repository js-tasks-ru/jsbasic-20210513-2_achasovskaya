function hideSelf() {
  addEventListener("click", function () {
    let element = document.getElementsByClassName('hide-self-button');
    element[0].setAttribute("hidden", "");
  });
}
