function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Intercambiar
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

// Ejemplo
let arr = [64, 25, 12, 22, 11];
console.log("Arreglo ordenado:", selectionSort(arr));
