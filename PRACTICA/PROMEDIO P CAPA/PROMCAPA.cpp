#include <iostream>
using namespace std;
int main() {
    int matriz[2][2][2] = {{{1,2},{3,4}}, {{5,6},{7,8}}};
    for(int k=0;k<2;k++){
        int suma=0, count=0;
        for(int i=0;i<2;i++)
            for(int j=0;j<2;j++){
                suma += matriz[k][i][j];
                count++;
            }
        cout << "Promedio capa " << k << ": " << (double)suma/count << endl;
    }
}
