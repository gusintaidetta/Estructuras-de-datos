using System;

public class NodoCircular {
    public int Dato { get; set; }
    public NodoCircular Siguiente { get; set; }
    
    public NodoCircular(int dato) {
        Dato = dato;
        Siguiente = null;
    }
}

public class ListaCircular {
    private NodoCircular ultimo;
    
    public ListaCircular() {
        ultimo = null;
    }
    
    private void InsertarVacio(int dato) {
        NodoCircular nuevo = new NodoCircular(dato);
        nuevo.Siguiente = nuevo;
        ultimo = nuevo;
    }
    
    public void InsertarInicio(int dato) {
        if (ultimo == null) {
            InsertarVacio(dato);
            return;
        }
        
        NodoCircular nuevo = new NodoCircular(dato);
        nuevo.Siguiente = ultimo.Siguiente;
        ultimo.Siguiente = nuevo;
    }
    
    public void InsertarFinal(int dato) {
        if (ultimo == null) {
            InsertarVacio(dato);
            return;
        }
        
        NodoCircular nuevo = new NodoCircular(dato);
        nuevo.Siguiente = ultimo.Siguiente;
        ultimo.Siguiente = nuevo;
        ultimo = nuevo;
    }
    
    public void Eliminar(int dato) {
        if (ultimo == null) return;
        
        // Caso único elemento
        if (ultimo.Siguiente == ultimo) {
            if (ultimo.Dato == dato) {
                ultimo = null;
            }
            return;
        }
        
        NodoCircular actual = ultimo.Siguiente;
        NodoCircular anterior = ultimo;
        
        do {
            if (actual.Dato == dato) {
                if (actual == ultimo) {
                    ultimo = anterior;
                }
                anterior.Siguiente = actual.Siguiente;
                return;
            }
            
            anterior = actual;
            actual = actual.Siguiente;
        } while (actual != ultimo.Siguiente);
    }
    
    public void Mostrar() {
        if (ultimo == null) {
            Console.WriteLine("Lista vacía");
            return;
        }
        
        NodoCircular actual = ultimo.Siguiente;
        
        do {
            Console.Write(actual.Dato + " ");
            actual = actual.Siguiente;
        } while (actual != ultimo.Siguiente);
        Console.WriteLine();
    }
}