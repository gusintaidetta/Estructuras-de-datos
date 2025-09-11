
using namespace std;
int main() {
    int arreglo[5];  


    int arreglo2[5] = {10, 20, 30, 40, 50};


    arreglo[0] = 99;


    int valor = arreglo2[2]; // 30


    for(int i = 0; i < 5; i++) {
        cout << "Índice " << i << " -> " << arreglo2[i] << endl;
    }


    return 0;
}
