function truncate(str, maxlength) {
  let result = null;
  if (str.length > maxlength) {
    result = str.slice(0, maxlength - 1) + "…";
  } else {
    result = str;
  }
  return result;
}
