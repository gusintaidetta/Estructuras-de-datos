#include <iostream>
using namespace std;

class ListaEnlazada {
private:
    struct Nodo {
        int dato;
        Nodo* siguiente;
        Nodo(int d) : dato(d), siguiente(nullptr) {}
    };
    
    Nodo* cabeza;
    
public:
    ListaEnlazada() : cabeza(nullptr) {}
    
    void insertarInicio(int dato) {
        Nodo* nuevo = new Nodo(dato);
        nuevo->siguiente = cabeza;
        cabeza = nuevo;
    }
    
    void insertarFinal(int dato) {
        Nodo* nuevo = new Nodo(dato);
        if (!cabeza) {
            cabeza = nuevo;
            return;
        }
        
        Nodo* actual = cabeza;
        while (actual->siguiente) {
            actual = actual->siguiente;
        }
        actual->siguiente = nuevo;
    }
    
    void eliminar(int dato) {
        if (!cabeza) return;
        
        if (cabeza->dato == dato) {
            Nodo* temp = cabeza;
            cabeza = cabeza->siguiente;
            delete temp;
            return;
        }
        
        Nodo* actual = cabeza;
        while (actual->siguiente && actual->siguiente->dato != dato) {
            actual = actual->siguiente;
        }
        
        if (actual->siguiente) {
            Nodo* temp = actual->siguiente;
            actual->siguiente = actual->siguiente->siguiente;
            delete temp;
        }
    }
    
    void mostrar() {
        Nodo* actual = cabeza;
        while (actual) {
            cout << actual->dato << " ";
            actual = actual->siguiente;
        }
        cout << endl;
    }
    
    ~ListaEnlazada() {
        while (cabeza) {
            Nodo* temp = cabeza;
            cabeza = cabeza->siguiente;
            delete temp;
        }
    }
};