using System;

class SelectionSort {
    static void selectionSort(int[] arr) {
        int n = arr.Length;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Intercambiar
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    static void Main() {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        Console.Write("Arreglo ordenado: ");
        foreach (int num in arr) {
            Console.Write(num + " ");
        }
    }
}
