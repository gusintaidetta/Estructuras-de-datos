using System;
class OrdenarBuscar {
    static void Main() {
        int[] arr = {7,2,9,4,1};
        Array.Sort(arr);
        int valor = 4;
        bool encontrado = Array.BinarySearch(arr, valor) >= 0;
        Console.WriteLine("Ordenado: " + string.Join(", ", arr));
        Console.WriteLine("Buscar " + valor + " -> " + (encontrado ? "SI":"NO"));
    }
}
