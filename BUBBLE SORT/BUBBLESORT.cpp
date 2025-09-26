#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

int main() {
    int datos[] = {1, 4, 2, 3};
    int n = sizeof(datos) / sizeof(datos[0]);

    cout << "Arreglo sin ordenar = ";
    for (int i = 0; i < n; i++) cout << datos[i] << " ";
    cout << endl;

    bubbleSort(datos, n);

    cout << "Arreglo ordenado   = ";
    for (int i = 0; i < n; i++) cout << datos[i] << " ";
    return 0;
}
