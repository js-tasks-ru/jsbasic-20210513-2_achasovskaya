function isEmpty(obj) {
  let result = true;
  for (let elem in obj) {
    result = false;
  }
  return result;
}

