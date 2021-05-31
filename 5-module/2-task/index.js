function toggleText() {
  let element = document.getElementsByClassName('toggle-text-button');
  for (let value of element) {
    value.addEventListener("click", function () {
      let valueText = document.getElementById('text');
      if (valueText.hasAttribute("hidden")) {
        valueText.removeAttribute("hidden");
      } else {
        valueText.setAttribute("hidden", "");
      }
    });
  }

}
