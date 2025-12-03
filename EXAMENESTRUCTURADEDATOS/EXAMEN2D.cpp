#include <iostream>
using namespace std;
int main() {
    int matriz[6][6] = {
        {3, 8, 1, 12, 7, 5},
        {7, 2, 9, 4, 6, 10},
        {4, 6, 5, 11, 13, 8},
        {15, 14, 2, 9, 3, 1},
        {8, 7, 6, 5, 4, 3},
        {2, 16, 17, 18, 19, 20}
    };
    int maximo = matriz[0][0];
    for(int i=0;i<6;i++)
        for(int j=0;j<6;j++)
            if(matriz[i][j] > maximo) maximo = matriz[i][j];

              cout << "Matriz:" << endl;

    for(int i=0;i<6;i++) {
        for(int j=0;j<6;j++) {
            cout << matriz[i][j] << " ";
        }
        cout << endl;
    }

    cout << "Maximo: " << maximo << endl;