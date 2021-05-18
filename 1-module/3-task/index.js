function ucFirst(str) {
  if (str) {
    let value = str.toLowerCase();
    return str[0].toUpperCase() + value.slice(1);
  } else {
    return '';
  }

}

ucFirst('вАся');