#include <iostream>
using namespace std;
int main() {
    int arr[] = {2, 7, 4, 9, 12, 5};
    int n = 6, pares = 0;
    for(int i=0; i<n; i++)
        if(arr[i] % 2 == 0) pares++;
    cout << "Cantidad de pares: " << pares << endl;
}

