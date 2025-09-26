using System;

class INCERCION {
    static void Main() {
        int[] arr = {5, 2, 4, 6, 1, 3};
        int n = arr.Length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }

        Console.Write("Arreglo ordenado: ");
        foreach (int num in arr) {
            Console.Write(num + " ");
        }
    }
}
