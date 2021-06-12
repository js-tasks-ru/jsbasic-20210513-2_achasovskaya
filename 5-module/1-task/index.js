function hideSelf() {
  let element = document.getElementsByClassName('hide-self-button');
  element[0].addEventListener("click", function () {
    element[0].setAttribute("hidden", "");
  });
}
