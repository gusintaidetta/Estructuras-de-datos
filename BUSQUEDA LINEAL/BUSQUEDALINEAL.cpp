#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arreglo = {10, 20, 30, 40, 50};
    int num;
    bool encontrado = false;

    cout << "¿Qué número buscas? ";
    cin >> num;

    for (int elemento : arreglo) {
        if (elemento == num) {
            encontrado = true;
            break;
        }
    }

    if (encontrado) {
        cout << "Elemento " << num << " encontrado en el arreglo." << endl;
    } else {
        cout << "Elemento no encontrado." << endl;
    }

    return 0;
}
