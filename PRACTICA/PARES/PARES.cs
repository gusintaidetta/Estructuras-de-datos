using System;

class ConteoPares {
    static void Main() {
        int[] arr = {2, 7, 4, 9, 12, 5};
        int pares = 0;
        foreach (int x in arr) {
            if (x % 2 == 0) pares++;
        }
        Console.WriteLine("Cantidad de pares: " + pares);
    }
}
