#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    int matriz[3][3] = {{3,1,2},{9,5,4},{7,8,6}};
    for(int i=0;i<3;i++){
        sort(matriz[i], matriz[i]+3);
    }
    cout << "Ordenada por filas:\n";
    for(int i=0;i<3;i++){
        for(int j=0;j<3;j++) cout << matriz[i][j] << " ";
        cout << endl;
    }
}
