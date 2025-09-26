using System;

class Program {
    static void BubbleSort(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
    }

    static void Main() {
        int[] datos = {1, 4, 2, 3};
        Console.Write("Arreglo sin ordenar = ");
        foreach (int v in datos) Console.Write(v + " ");
        Console.WriteLine();

        BubbleSort(datos);

        Console.Write("Arreglo ordenado   = ");
        foreach (int v in datos) Console.Write(v + " ");
    }
}
