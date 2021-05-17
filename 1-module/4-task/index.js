function checkSpam(str) {
  let result = false;
  let value = str.toLowerCase();
  if (value.indexOf('1xbet') != -1 || value.indexOf('xxx') != -1) {
    result = true;
  }
  return result;

}
