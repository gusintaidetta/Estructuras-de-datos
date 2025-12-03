using System;

public class NodoDoble {
    public int Dato { get; set; }
    public NodoDoble Siguiente { get; set; }
    public NodoDoble Anterior { get; set; }
    
    public NodoDoble(int dato) {
        Dato = dato;
        Siguiente = null;
        Anterior = null;
    }
}

public class ListaDoblementeEnlazada {
    private NodoDoble cabeza;
    private NodoDoble cola;
    
    public ListaDoblementeEnlazada() {
        cabeza = null;
        cola = null;
    }
    
    public void InsertarInicio(int dato) {
        NodoDoble nuevo = new NodoDoble(dato);
        if (cabeza == null) {
            cabeza = cola = nuevo;
        } else {
            nuevo.Siguiente = cabeza;
            cabeza.Anterior = nuevo;
            cabeza = nuevo;
        }
    }
    
    public void InsertarFinal(int dato) {
        NodoDoble nuevo = new NodoDoble(dato);
        if (cabeza == null) {
            cabeza = cola = nuevo;
        } else {
            nuevo.Anterior = cola;
            cola.Siguiente = nuevo;
            cola = nuevo;
        }
    }
    
    public void Eliminar(int dato) {
        NodoDoble actual = cabeza;
        while (actual != null) {
            if (actual.Dato == dato) {
                if (actual.Anterior != null) {
                    actual.Anterior.Siguiente = actual.Siguiente;
                } else {
                    cabeza = actual.Siguiente;
                }
                
                if (actual.Siguiente != null) {
                    actual.Siguiente.Anterior = actual.Anterior;
                } else {
                    cola = actual.Anterior;
                }
                return;
            }
            actual = actual.Siguiente;
        }
    }
    
    public void MostrarAdelante() {
        NodoDoble actual = cabeza;
        while (actual != null) {
            Console.Write(actual.Dato + " ");
            actual = actual.Siguiente;
        }
        Console.WriteLine();
    }
    
    public void MostrarAtras() {
        NodoDoble actual = cola;
        while (actual != null) {
            Console.Write(actual.Dato + " ");
            actual = actual.Anterior;
        }
        Console.WriteLine();
    }
}