function factorial(n) {
  let iterator = 1;
  let result = 1;
  if (n > 0) {
    result = n;
    while (iterator < n) {
      result = result * iterator;
      iterator++;
    }
  }
  return result;
}