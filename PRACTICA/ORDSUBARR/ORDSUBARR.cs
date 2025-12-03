using System;
using System.Linq;
class OrdenarSubarreglos {
    static void Main() {
        int[][] matriz = {
            new int[]{3,1,2},
            new int[]{9,5,4},
            new int[]{7,8,6}
        };
        int[][] asc = matriz.Select(f => f.OrderBy(x=>x).ToArray()).ToArray();
        int[][] desc = matriz.Select(f => f.OrderByDescending(x=>x).ToArray()).ToArray();
        int[][] alt = matriz.Select((f,i)=> (i%2==0 ? f.OrderBy(x=>x) : f.OrderByDescending(x=>x)).ToArray()).ToArray();
        
        Console.WriteLine("Ascendente:");
        foreach(var fila in asc) Console.WriteLine(string.Join(" ", fila));
    }
}
