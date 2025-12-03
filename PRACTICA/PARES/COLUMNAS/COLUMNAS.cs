using System;

class SumaColumnas {
    static void Main() {
        int[,] matriz = {{1,2,3},{4,5,6},{7,8,9}};
        int columnas = matriz.GetLength(1);
        int filas = matriz.GetLength(0);
        int[] suma = new int[columnas];

        for (int i=0; i<filas; i++) {
            for (int j=0; j<columnas; j++) {
                suma[j] += matriz[i,j];
            }
        }

        Console.Write("Suma de columnas: ");
        foreach (int s in suma) Console.Write(s + " ");
    }
}
