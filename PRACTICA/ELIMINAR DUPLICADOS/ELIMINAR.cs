using System;
using System.Collections.Generic;

class EliminarDuplicados {
    static void Main() {
        int[] arr = {1,2,2,3,4,4,5};
        HashSet<int> set = new HashSet<int>(arr);
        Console.WriteLine("Sin duplicados: " + string.Join(", ", set));
    }
}

