function filterRange(arr, a, b) {
  let result = [];
  result = arr.filter(item => (item <= b && item >= a));
  return result;
}

