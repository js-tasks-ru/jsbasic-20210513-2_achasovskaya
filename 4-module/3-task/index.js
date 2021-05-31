function highlight(table) {
  for (let elem = 1; elem < table.rows.length; elem++) {
    let Status = table.rows[elem].cells[3],
      Gender = table.rows[elem].cells[2].innerHTML,
      Age = table.rows[elem].cells[1].innerHTML;
    if (Status.hasAttribute('data-available')) {
      if (Status.getAttribute('data-available') === 'true') {
        table.rows[elem].classList.add("available");
      } else {
        table.rows[elem].classList.add("unavailable");
      }
    } else {
      table.rows[elem].setAttribute("hidden", "");
    }
    if (Gender === "m") {
      table.rows[elem].classList.add("male");
    } else {
      table.rows[elem].classList.add("female");
    }
    if (Age < 18) {
      table.rows[elem].style = "text-decoration: line-through";
      console.log("Age<18");
    }
    console.log(table.rows[elem]);
  }
}
