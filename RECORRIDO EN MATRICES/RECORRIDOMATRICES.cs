using System;

class Program {
    static void Main() {
        int[,] matriz = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Recorrido por FILAS
        Console.WriteLine("Recorrido por FILAS:");
        for (int i = 0; i < matriz.GetLength(0); i++) {
            for (int j = 0; j < matriz.GetLength(1); j++) {
                Console.Write(matriz[i, j] + " ");
            }
            Console.WriteLine();
        }

        // Recorrido por COLUMNAS
        Console.WriteLine("\nRecorrido por COLUMNAS:");
        for (int j = 0; j < matriz.GetLength(1); j++) {
            for (int i = 0; i < matriz.GetLength(0); i++) {
                Console.Write(matriz[i, j] + " ");
            }
            Console.WriteLine();
        }
    }
}
