const findTarget = (arr, target) => {
  let l = 0;
  let r = arr.length - 1;
  let mid;

  while (l <= r) {
    mid = l + Math.floor((r - l) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
};

module.exports = findTarget;
