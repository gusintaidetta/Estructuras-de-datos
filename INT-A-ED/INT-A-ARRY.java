int[] arreglo = new int[5]; // arreglo de 5 enteros inicializados en 0


// Inicialización con valores
int[] arreglo2 = {10, 20, 30, 40, 50};


// Asignar valor por índice
arreglo[0] = 99;


// Recuperar un valor
int valor = arreglo2[2]; // 30


// Recorrer un arreglo
for(int i = 0; i < arreglo2.length; i++) {
    System.out.println("Índice " + i + " -> " + arreglo2[i]);
}
