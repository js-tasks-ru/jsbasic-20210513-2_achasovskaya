function camelize(str) {
  let arr = str.split('-');
  let result = [];
  result.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    let value = arr[i].toLowerCase();
    result.push((arr[i])[0].toUpperCase() + value.slice(1));
  }
  return result.join("");
}
