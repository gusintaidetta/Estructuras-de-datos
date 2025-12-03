#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    int matriz[5][5][5] = {
        {
            {3, 1, 2, 7, 5},
            {9, 5, 4, 8, 6},
            {7, 8, 6, 2, 1},
            {4, 3, 5, 9, 10},
            {11, 12, 13, 14, 15}
        },
        {
            {16, 17, 18, 19, 20},
            {21, 22, 23, 24, 25},
            {26, 27, 28, 29, 30},
            {31, 32, 33, 34, 35},
            {36, 37, 38, 39, 40}
        },
        {
            {41, 42, 43, 44, 45},
            {46, 47, 48, 49, 50},
            {51, 52, 53, 54, 55},
            {56, 57, 58, 59, 60},
            {61, 62, 63, 64, 65}
        },
        {
            {66, 67, 68, 69, 70},
            {71, 72, 73, 74, 75},
            {76, 77, 78, 79, 80},
            {81, 82, 83, 84, 85},
            {86, 87, 88, 89, 90}
        },
        {
            {91, 92, 93, 94, 95},
            {96, 97, 98, 99, 100},
            {101, 102, 103, 104, 105},
            {106, 107, 108, 109, 110},
            {111, 112, 113, 114, 115}
        }
    };
    // Copiar todos los elementos a un vector
    int total = 5 * 5 * 5;
    int temp[125];
    int idx = 0;
    for(int k=0; k<5; k++)
        for(int i=0; i<5; i++)
            for(int j=0; j<5; j++)
                temp[idx++] = matriz[k][i][j];

    // Ordenar el vector
    sort(temp, temp + total);

    // Volver a llenar la matriz con los valores ordenados
    idx = 0;
    for(int k=0; k<5; k++)
        for(int i=0; i<5; i++)
            for(int j=0; j<5; j++)
                matriz[k][i][j] = temp[idx++];

    // Imprimir la matriz ordenada
    cout << "Matriz ordenada:\n";
    for(int k=0; k<5; k++) {
        cout << "Capa " << k+1 << ":\n";
        for(int i=0; i<5; i++) {
            for(int j=0; j<5; j++)
                cout << matriz[k][i][j] << " ";
            cout << "\n";
        }
        cout << "\n";
    }
}
