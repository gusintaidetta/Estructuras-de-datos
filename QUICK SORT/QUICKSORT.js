function quicksort(arr) {
  if (arr.length <= 1) return arr;
  let p = arr[Math.floor(arr.length / 2)];
  let izq = arr.filter(x => x < p);
  let mid = arr.filter(x => x === p);
  let der = arr.filter(x => x > p);
  return [...quicksort(izq), ...mid, ...quicksort(der)];
}

let nums = [5, 2, 9, 1, 5, 6];
console.log(quicksort(nums));

