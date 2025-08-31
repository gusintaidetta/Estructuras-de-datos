#include <iostream>
using namespace std;
int main() {
    // Declaración (tamaño fijo)
    int arreglo[5];  // valores indefinidos


    // Inicialización
    int arreglo2[5] = {10, 20, 30, 40, 50};


    // Asignar valor
    arreglo[0] = 99;


    // Recuperar valor
    int valor = arreglo2[2]; // 30


    // Recorrer arreglo
    for(int i = 0; i < 5; i++) {
        cout << "Índice " << i << " -> " << arreglo2[i] << endl;
    }


    return 0;
}
