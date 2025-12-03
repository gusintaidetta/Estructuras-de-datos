#include <iostream>
using namespace std;

class ListaCircular {
private:
    struct NodoCircular {
        int dato;
        NodoCircular* siguiente;
        NodoCircular(int d) : dato(d), siguiente(nullptr) {}
    };
    
    NodoCircular* ultimo;
    
    void insertarVacio(int dato) {
        NodoCircular* nuevo = new NodoCircular(dato);
        nuevo->siguiente = nuevo;
        ultimo = nuevo;
    }
    
public:
    ListaCircular() : ultimo(nullptr) {}
    
    void insertarInicio(int dato) {
        if (!ultimo) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircular* nuevo = new NodoCircular(dato);
        nuevo->siguiente = ultimo->siguiente;
        ultimo->siguiente = nuevo;
    }
    
    void insertarFinal(int dato) {
        if (!ultimo) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircular* nuevo = new NodoCircular(dato);
        nuevo->siguiente = ultimo->siguiente;
        ultimo->siguiente = nuevo;
        ultimo = nuevo;
    }
    
    void eliminar(int dato) {
        if (!ultimo) return;
        
        // Caso único elemento
        if (ultimo->siguiente == ultimo) {
            if (ultimo->dato == dato) {
                delete ultimo;
                ultimo = nullptr;
            }
            return;
        }
        
        NodoCircular* actual = ultimo->siguiente;
        NodoCircular* anterior = ultimo;
        
        do {
            if (actual->dato == dato) {
                if (actual == ultimo) {
                    ultimo = anterior;
                }
                anterior->siguiente = actual->siguiente;
                delete actual;
                return;
            }
            
            anterior = actual;
            actual = actual->siguiente;
        } while (actual != ultimo->siguiente);
    }
    
    void mostrar() {
        if (!ultimo) {
            cout << "Lista vacía" << endl;
            return;
        }
        
        NodoCircular* actual = ultimo->siguiente;
        
        do {
            cout << actual->dato << " ";
            actual = actual->siguiente;
        } while (actual != ultimo->siguiente);
        cout << endl;
    }
    
    ~ListaCircular() {
        if (!ultimo) return;
        
        NodoCircular* actual = ultimo->siguiente;
        NodoCircular* siguiente;
        
        while (actual != ultimo) {
            siguiente = actual->siguiente;
            delete actual;
            actual = siguiente;
        }
        delete ultimo;
    }
};