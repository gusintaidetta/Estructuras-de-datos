#include <iostream>
using namespace std;
int main() {
    int matriz[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int suma[3] = {0,0,0};
    for(int i=0; i<3; i++)
        for(int j=0; j<3; j++)
            suma[j] += matriz[i][j];
    cout << "Suma de columnas: ";
    for(int j=0; j<3; j++) cout << suma[j] << " ";
}

