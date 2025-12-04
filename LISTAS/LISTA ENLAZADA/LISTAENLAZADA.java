public class LISTAENLAZADA {
    class Nodo {
        int dato;
        Nodo siguiente;
        
        Nodo(int dato) {
            this.dato = dato;
            this.siguiente = null;
        }
    }
    
    private Nodo cabeza;
    
    public LISTAENLAZADA() {
        this.cabeza = null;
    }
    
    public void insertarInicio(int dato) {
        Nodo nuevo = new Nodo(dato);
        nuevo.siguiente = cabeza;
        cabeza = nuevo;
    }
    
    public void insertarFinal(int dato) {
        Nodo nuevo = new Nodo(dato);
        if (cabeza == null) {
            cabeza = nuevo;
            return;
        }
        
        Nodo actual = cabeza;
        while (actual.siguiente != null) {
            actual = actual.siguiente;
        }
        actual.siguiente = nuevo;
    }
    
    public void eliminar(int dato) {
        if (cabeza == null) return;
        
        if (cabeza.dato == dato) {
            cabeza = cabeza.siguiente;
            return;
        }
        
        Nodo actual = cabeza;
        while (actual.siguiente != null && actual.siguiente.dato != dato) {
            actual = actual.siguiente;
        }
        
        if (actual.siguiente != null) {
            actual.siguiente = actual.siguiente.siguiente;
        }
    }
    
    public void mostrar() {
        Nodo actual = cabeza;
        while (actual != null) {
            System.out.print(actual.dato + " ");
            actual = actual.siguiente;
        }
        System.out.println();
    }
}