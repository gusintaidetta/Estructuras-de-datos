function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

let datos = [1, 4, 2, 3];
console.log("Arreglo sin ordenar =", datos);

bubbleSort(datos);

console.log("Arreglo ordenado   =", datos);
