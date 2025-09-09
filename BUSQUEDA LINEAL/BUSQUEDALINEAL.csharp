using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> arreglo = new List<int> {10, 20, 30, 40, 50};

        Console.Write("¿Qué número buscas? ");
        int num = int.Parse(Console.ReadLine());

        bool encontrado = false;
        foreach (int elemento in arreglo) {
            if (elemento == num) {
                encontrado = true;
                break;
            }
        }

        if (encontrado) {
            Console.WriteLine($"Elemento {num} encontrado en el arreglo.");
        } else {
            Console.WriteLine("Elemento no encontrado.");
        }
    }
}
