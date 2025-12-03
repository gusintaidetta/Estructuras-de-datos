using System;

class OrdenarFilas {
    static void Main() {
        int[,] matriz = {{3,1,2},{9,5,4},{7,8,6}};
        for (int i=0; i<matriz.GetLength(0); i++) {
            int[] fila = new int[matriz.GetLength(1)];
            for (int j=0; j<matriz.GetLength(1); j++) fila[j] = matriz[i,j];
            Array.Sort(fila);
            for (int j=0; j<fila.Length; j++) matriz[i,j] = fila[j];
        }
        Console.WriteLine("Ordenada por filas:");
        for (int i=0; i<matriz.GetLength(0); i++) {
            for (int j=0; j<matriz.GetLength(1); j++) Console.Write(matriz[i,j]+" ");
            Console.WriteLine();
        }
    }
}

