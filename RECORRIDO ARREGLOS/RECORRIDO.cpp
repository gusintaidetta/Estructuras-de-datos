#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arreglo = {10, 20, 30, 40, 50};

    cout << "Recorrido del arreglo:" << endl;
    for (int elemento : arreglo) {
        cout << elemento << endl;
    }

    return 0;
}
