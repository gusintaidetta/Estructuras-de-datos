function heapify(arr, n, i) {
  let m = i, l = 2*i+1, r = 2*i+2;
  if (l < n && arr[l] > arr[m]) m = l;
  if (r < n && arr[r] > arr[m]) m = r;
  if (m != i) {
    [arr[i], arr[m]] = [arr[m], arr[i]];
    heapify(arr, n, m);
  }
}

function heapsort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n/2)-1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n-1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}

let nums = [5, 2, 9, 1, 5, 6];
heapsort(nums);
console.log(nums);
