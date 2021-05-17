function sumSalary(salaries) {
  let result = 0;
  if (salaries) {
    for (let elem in salaries) {
      if (salaries[elem] && typeof salaries[elem] == "number" && isFinite(salaries[elem])) {
        result += salaries[elem];
      }
    }
  }
  return result;
}

