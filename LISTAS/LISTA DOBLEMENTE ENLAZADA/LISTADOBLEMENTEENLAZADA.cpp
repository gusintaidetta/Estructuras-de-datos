#include <iostream>
using namespace std;

class ListaDoblementeEnlazada {
private:
    struct NodoDoble {
        int dato;
        NodoDoble* siguiente;
        NodoDoble* anterior;
        NodoDoble(int d) : dato(d), siguiente(nullptr), anterior(nullptr) {}
    };
    
    NodoDoble* cabeza;
    NodoDoble* cola;
    
public:
    ListaDoblementeEnlazada() : cabeza(nullptr), cola(nullptr) {}
    
    void insertarInicio(int dato) {
        NodoDoble* nuevo = new NodoDoble(dato);
        if (!cabeza) {
            cabeza = cola = nuevo;
        } else {
            nuevo->siguiente = cabeza;
            cabeza->anterior = nuevo;
            cabeza = nuevo;
        }
    }
    
    void insertarFinal(int dato) {
        NodoDoble* nuevo = new NodoDoble(dato);
        if (!cabeza) {
            cabeza = cola = nuevo;
        } else {
            nuevo->anterior = cola;
            cola->siguiente = nuevo;
            cola = nuevo;
        }
    }
    
    void eliminar(int dato) {
        NodoDoble* actual = cabeza;
        while (actual) {
            if (actual->dato == dato) {
                if (actual->anterior) {
                    actual->anterior->siguiente = actual->siguiente;
                } else {
                    cabeza = actual->siguiente;
                }
                
                if (actual->siguiente) {
                    actual->siguiente->anterior = actual->anterior;
                } else {
                    cola = actual->anterior;
                }
                delete actual;
                return;
            }
            actual = actual->siguiente;
        }
    }
    
    void mostrarAdelante() {
        NodoDoble* actual = cabeza;
        while (actual) {
            cout << actual->dato << " ";
            actual = actual->siguiente;
        }
        cout << endl;
    }
    
    void mostrarAtras() {
        NodoDoble* actual = cola;
        while (actual) {
            cout << actual->dato << " ";
            actual = actual->anterior;
        }
        cout << endl;
    }
    
    ~ListaDoblementeEnlazada() {
        while (cabeza) {
            NodoDoble* temp = cabeza;
            cabeza = cabeza->siguiente;
            delete temp;
        }
    }
};