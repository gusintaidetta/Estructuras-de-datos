#include <iostream>
using namespace std;


class Persona {
private:
    string nombre;
    int edad;


public:
    
    Persona(string n, int e) {
        nombre = n;
        edad = e;
    }


    
    string saludar() {
        return "Hola, soy " + nombre + " y tengo " + to_string(edad) + " años.";
    }
};


// Uso del Daato abs
int main() {
    Persona p1("Gustavo", 20);
    cout << p1.saludar() << endl;
    return 0;
}
