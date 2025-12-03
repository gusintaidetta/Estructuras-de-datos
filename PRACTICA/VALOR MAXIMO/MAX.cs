using System;
class MaximoMatriz {
    static void Main() {
        int[,] matriz = {{3,8,1},{7,2,9},{4,6,5}};
        int maximo = matriz[0,0];
        for (int i=0;i<matriz.GetLength(0);i++)
            for (int j=0;j<matriz.GetLength(1);j++)
                if(matriz[i,j] > maximo) maximo = matriz[i,j];
        Console.WriteLine("Máximo: " + maximo);
    }
}
