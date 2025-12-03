using System;

public class NodoCircularDoble {
    public int Dato { get; set; }
    public NodoCircularDoble Siguiente { get; set; }
    public NodoCircularDoble Anterior { get; set; }
    
    public NodoCircularDoble(int dato) {
        Dato = dato;
        Siguiente = null;
        Anterior = null;
    }
}

public class ListaCircularDoble {
    private NodoCircularDoble ultimo;
    
    public ListaCircularDoble() {
        ultimo = null;
    }
    
    private void InsertarVacio(int dato) {
        NodoCircularDoble nuevo = new NodoCircularDoble(dato);
        nuevo.Siguiente = nuevo;
        nuevo.Anterior = nuevo;
        ultimo = nuevo;
    }
    
    public void InsertarInicio(int dato) {
        if (ultimo == null) {
            InsertarVacio(dato);
            return;
        }
        
        NodoCircularDoble nuevo = new NodoCircularDoble(dato);
        nuevo.Siguiente = ultimo.Siguiente;
        nuevo.Anterior = ultimo;
        ultimo.Siguiente.Anterior = nuevo;
        ultimo.Siguiente = nuevo;
    }
    
    public void InsertarFinal(int dato) {
        if (ultimo == null) {
            InsertarVacio(dato);
            return;
        }
        
        NodoCircularDoble nuevo = new NodoCircularDoble(dato);
        nuevo.Siguiente = ultimo.Siguiente;
        nuevo.Anterior = ultimo;
        ultimo.Siguiente.Anterior = nuevo;
        ultimo.Siguiente = nuevo;
        ultimo = nuevo;
    }
    
    public void Eliminar(int dato) {
        if (ultimo == null) return;
        
        // Caso único elemento
        if (ultimo.Siguiente == ultimo && ultimo.Dato == dato) {
            ultimo = null;
            return;
        }
        
        NodoCircularDoble actual = ultimo.Siguiente;
        
        do {
            if (actual.Dato == dato) {
                actual.Anterior.Siguiente = actual.Siguiente;
                actual.Siguiente.Anterior = actual.Anterior;
                
                if (actual == ultimo) {
                    ultimo = actual.Anterior;
                }
                return;
            }
            actual = actual.Siguiente;
        } while (actual != ultimo.Siguiente);
    }
    
    public void MostrarAdelante() {
        if (ultimo == null) {
            Console.WriteLine("Lista vacía");
            return;
        }
        
        NodoCircularDoble actual = ultimo.Siguiente;
        
        do {
            Console.Write(actual.Dato + " ");
            actual = actual.Siguiente;
        } while (actual != ultimo.Siguiente);
        Console.WriteLine();
    }
    
    public void MostrarAtras() {
        if (ultimo == null) {
            Console.WriteLine("Lista vacía");
            return;
        }
        
        NodoCircularDoble actual = ultimo;
        
        do {
            Console.Write(actual.Dato + " ");
            actual = actual.Anterior;
        } while (actual != ultimo);
        Console.WriteLine();
    }
}