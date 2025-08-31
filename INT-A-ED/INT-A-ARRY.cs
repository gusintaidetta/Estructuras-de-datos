// Declaración
int[] arreglo = new int[5];  // inicializado en 0


// Inicialización con valores
int[] arreglo2 = {10, 20, 30, 40, 50};


// Asignar valor por índice
arreglo[1] = 77;


// Recuperar un valor
int valor = arreglo2[3]; // 40


// Recorrer arreglo
for(int i = 0; i < arreglo2.Length; i++) {
    Console.WriteLine("Índice " + i + " -> " + arreglo2[i]);
}
