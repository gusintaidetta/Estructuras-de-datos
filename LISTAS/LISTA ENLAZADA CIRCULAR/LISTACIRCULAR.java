public class ListaCircular {
    class NodoCircular {
        int dato;
        NodoCircular siguiente;
        
        NodoCircular(int dato) {
            this.dato = dato;
            this.siguiente = null;
        }
    }
    
    private NodoCircular ultimo;
    
    public ListaCircular() {
        this.ultimo = null;
    }
    
    private void insertarVacio(int dato) {
        NodoCircular nuevo = new NodoCircular(dato);
        nuevo.siguiente = nuevo;
        ultimo = nuevo;
    }
    
    public void insertarInicio(int dato) {
        if (ultimo == null) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircular nuevo = new NodoCircular(dato);
        nuevo.siguiente = ultimo.siguiente;
        ultimo.siguiente = nuevo;
    }
    
    public void insertarFinal(int dato) {
        if (ultimo == null) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircular nuevo = new NodoCircular(dato);
        nuevo.siguiente = ultimo.siguiente;
        ultimo.siguiente = nuevo;
        ultimo = nuevo;
    }
    
    public void eliminar(int dato) {
        if (ultimo == null) return;
        
        // Caso único elemento
        if (ultimo.siguiente == ultimo) {
            if (ultimo.dato == dato) {
                ultimo = null;
            }
            return;
        }
        
        NodoCircular actual = ultimo.siguiente;
        NodoCircular anterior = ultimo;
        
        do {
            if (actual.dato == dato) {
                if (actual == ultimo) {
                    ultimo = anterior;
                }
                anterior.siguiente = actual.siguiente;
                return;
            }
            
            anterior = actual;
            actual = actual.siguiente;
        } while (actual != ultimo.siguiente);
    }
    
    public void mostrar() {
        if (ultimo == null) {
            System.out.println("Lista vacía");
            return;
        }
        
        NodoCircular actual = ultimo.siguiente;
        
        do {
            System.out.print(actual.dato + " ");
            actual = actual.siguiente;
        } while (actual != ultimo.siguiente);
        System.out.println();
    }
}