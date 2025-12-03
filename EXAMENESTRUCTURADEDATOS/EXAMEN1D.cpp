#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    int arr[] = {7,2,9,4,1,5,3,6,8,10};
    int n = 10;
    sort(arr, arr+n);
    int valor = 4;
    bool encontrado = binary_search(arr, arr+n, valor);
    cout << "Ordenado: ";
    for(int x: arr) cout << x << " ";
    cout << "\nBuscar " << valor << " -> " << (encontrado ? "SI":"NO");
}