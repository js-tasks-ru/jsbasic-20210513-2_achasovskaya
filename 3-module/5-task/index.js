function getMinMax(str) {
  let result = {
    min: null,
    max: null
  };
  let arr = str.split(/,| /);
  arr.forEach(element => {
    if (element && Number(element)) {
      result.min = Number(element) < result.min ? Number(element) : result.min;
      result.max = Number(element) > result.max ? Number(element) : result.max;
    }
  });
  return result;
}
