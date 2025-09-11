#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arreglo = {5, 10, 15, 20, 25, 30};

    cout << "Arreglo original: ";
    for (int num : arreglo) {
        cout << num << " ";
    }
    cout << endl;

    arreglo.push_back(35); 

    cout << "Arreglo después de insertar: ";
    for (int num : arreglo) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
