using System;

public class Nodo {
    public int Dato { get; set; }
    public Nodo Siguiente { get; set; }
    
    public Nodo(int dato) {
        Dato = dato;
        Siguiente = null;
    }
}

public class ListaEnlazada {
    private Nodo cabeza;
    
    public ListaEnlazada() {
        cabeza = null;
    }
    
    public void InsertarInicio(int dato) {
        Nodo nuevo = new Nodo(dato);
        nuevo.Siguiente = cabeza;
        cabeza = nuevo;
    }
    
    public void InsertarFinal(int dato) {
        Nodo nuevo = new Nodo(dato);
        if (cabeza == null) {
            cabeza = nuevo;
            return;
        }
        
        Nodo actual = cabeza;
        while (actual.Siguiente != null) {
            actual = actual.Siguiente;
        }
        actual.Siguiente = nuevo;
    }
    
    public void Eliminar(int dato) {
        if (cabeza == null) return;
        
        if (cabeza.Dato == dato) {
            cabeza = cabeza.Siguiente;
            return;
        }
        
        Nodo actual = cabeza;
        while (actual.Siguiente != null && actual.Siguiente.Dato != dato) {
            actual = actual.Siguiente;
        }
        
        if (actual.Siguiente != null) {
            actual.Siguiente = actual.Siguiente.Siguiente;
        }
    }
    
    public void Mostrar() {
        Nodo actual = cabeza;
        while (actual != null) {
            Console.Write(actual.Dato + " ");
            actual = actual.Siguiente;
        }
        Console.WriteLine();
    }
}