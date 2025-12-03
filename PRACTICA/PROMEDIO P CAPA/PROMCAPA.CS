using System;

class PromedioCapa {
    static void Main() {
        int[,,] matriz = {
            {{1,2},{3,4}},
            {{5,6},{7,8}}
        };
        for (int k=0; k<matriz.GetLength(0); k++) {
            int suma=0, count=0;
            for (int i=0; i<matriz.GetLength(1); i++)
                for (int j=0; j<matriz.GetLength(2); j++) {
                    suma += matriz[k,i,j];
                    count++;
                }
            Console.WriteLine($"Promedio capa {k}: {(double)suma/count}");
        }
    }
}

