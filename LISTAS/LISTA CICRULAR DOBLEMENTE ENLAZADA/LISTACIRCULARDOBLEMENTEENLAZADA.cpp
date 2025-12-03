#include <iostream>
using namespace std;

class ListaCircularDoble {
private:
    struct NodoCircularDoble {
        int dato;
        NodoCircularDoble* siguiente;
        NodoCircularDoble* anterior;
        NodoCircularDoble(int d) : dato(d), siguiente(nullptr), anterior(nullptr) {}
    };
    
    NodoCircularDoble* ultimo;
    
    void insertarVacio(int dato) {
        NodoCircularDoble* nuevo = new NodoCircularDoble(dato);
        nuevo->siguiente = nuevo;
        nuevo->anterior = nuevo;
        ultimo = nuevo;
    }
    
public:
    ListaCircularDoble() : ultimo(nullptr) {}
    
    void insertarInicio(int dato) {
        if (!ultimo) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircularDoble* nuevo = new NodoCircularDoble(dato);
        nuevo->siguiente = ultimo->siguiente;
        nuevo->anterior = ultimo;
        ultimo->siguiente->anterior = nuevo;
        ultimo->siguiente = nuevo;
    }
    
    void insertarFinal(int dato) {
        if (!ultimo) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircularDoble* nuevo = new NodoCircularDoble(dato);
        nuevo->siguiente = ultimo->siguiente;
        nuevo->anterior = ultimo;
        ultimo->siguiente->anterior = nuevo;
        ultimo->siguiente = nuevo;
        ultimo = nuevo;
    }
    
    void eliminar(int dato) {
        if (!ultimo) return;
        
        // Caso único elemento
        if (ultimo->siguiente == ultimo && ultimo->dato == dato) {
            delete ultimo;
            ultimo = nullptr;
            return;
        }
        
        NodoCircularDoble* actual = ultimo->siguiente;
        
        do {
            if (actual->dato == dato) {
                actual->anterior->siguiente = actual->siguiente;
                actual->siguiente->anterior = actual->anterior;
                
                if (actual == ultimo) {
                    ultimo = actual->anterior;
                }
                delete actual;
                return;
            }
            actual = actual->siguiente;
        } while (actual != ultimo->siguiente);
    }
    
    void mostrarAdelante() {
        if (!ultimo) {
            cout << "Lista vacía" << endl;
            return;
        }
        
        NodoCircularDoble* actual = ultimo->siguiente;
        
        do {
            cout << actual->dato << " ";
            actual = actual->siguiente;
        } while (actual != ultimo->siguiente);
        cout << endl;
    }
    
    void mostrarAtras() {
        if (!ultimo) {
            cout << "Lista vacía" << endl;
            return;
        }
        
        NodoCircularDoble* actual = ultimo;
        
        do {
            cout << actual->dato << " ";
            actual = actual->anterior;
        } while (actual != ultimo);
        cout << endl;
    }
    
    ~ListaCircularDoble() {
        if (!ultimo) return;
        
        NodoCircularDoble* actual = ultimo->siguiente;
        NodoCircularDoble* siguiente;
        
        while (actual != ultimo) {
            siguiente = actual->siguiente;
            delete actual;
            actual = siguiente;
        }
        delete ultimo;
    }
};