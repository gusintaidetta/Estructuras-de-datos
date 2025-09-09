#include <iostream>
using namespace std;

int main() {
    int matriz[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // Recorrido por FILAS
    cout << "Recorrido por FILAS:\n";
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << matriz[i][j] << " ";
        }
        cout << endl;
    }

    // Recorrido por COLUMNAS
    cout << "\nRecorrido por COLUMNAS:\n";
    for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 3; i++) {
            cout << matriz[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
