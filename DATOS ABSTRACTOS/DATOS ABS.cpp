#include <iostream>
using namespace std;


class Persona {
private:
    string nombre;
    int edad;


public:
    // Constructor
    Persona(string n, int e) {
        nombre = n;
        edad = e;
    }


    // Método
    string saludar() {
        return "Hola, soy " + nombre + " y tengo " + to_string(edad) + " años.";
    }
};


// Uso del TDA
int main() {
    Persona p1("Gustavo", 20);
    cout << p1.saludar() << endl;
    return 0;
}
