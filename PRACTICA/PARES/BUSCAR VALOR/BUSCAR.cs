using System;

class BuscarValor {
    static void Main() {
        int[,] matriz = {{1,2,3},{4,5,6},{7,8,9}};
        int valor = 5;
        bool encontrado = false;

        for (int i=0; i<matriz.GetLength(0); i++) {
            for (int j=0; j<matriz.GetLength(1); j++) {
                if (matriz[i,j] == valor) {
                    encontrado = true;
                }
            }
        }

        Console.WriteLine("Encontrado: " + (encontrado ? "SI" : "NO"));
    }
}
