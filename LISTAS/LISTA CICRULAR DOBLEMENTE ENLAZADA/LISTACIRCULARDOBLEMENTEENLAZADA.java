public class LISTADCIRCULARDOBLEMENTEENLAZADA {
    class NodoCircularDoble {
        int dato;
        NodoCircularDoble siguiente;
        NodoCircularDoble anterior
        
        NodoCircularDoble(int dato) {
            this.dato = dato;
            this.siguiente = null;
            this.anterior = null;
        }
    }
    
    private NodoCircularDoble ultimo;
    
    public ListaCircularDoble() {
        this.ultimo = null;
    }
    
    private void insertarVacio(int dato) {
        NodoCircularDoble nuevo = new NodoCircularDoble(dato);
        nuevo.siguiente = nuevo;
        nuevo.anterior = nuevo;
        ultimo = nuevo;
    }
    
    public void insertarInicio(int dato) {
        if (ultimo == null) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircularDoble nuevo = new NodoCircularDoble(dato);
        nuevo.siguiente = ultimo.siguiente;
        nuevo.anterior = ultimo;
        ultimo.siguiente.anterior = nuevo;
        ultimo.siguiente = nuevo;
    }
    
    public void insertarFinal(int dato) {
        if (ultimo == null) {
            insertarVacio(dato);
            return;
        }
        
        NodoCircularDoble nuevo = new NodoCircularDoble(dato);
        nuevo.siguiente = ultimo.siguiente;
        nuevo.anterior = ultimo;
        ultimo.siguiente.anterior = nuevo;
        ultimo.siguiente = nuevo;
        ultimo = nuevo;
    }
    
    public void eliminar(int dato) {
        if (ultimo == null) return;
        
        // Caso único elemento
        if (ultimo.siguiente == ultimo && ultimo.dato == dato) {
            ultimo = null;
            return;
        }
        
        NodoCircularDoble actual = ultimo.siguiente;
        
        do {
            if (actual.dato == dato) {
                actual.anterior.siguiente = actual.siguiente;
                actual.siguiente.anterior = actual.anterior;
                
                if (actual == ultimo) {
                    ultimo = actual.anterior;
                }
                return;
            }
            actual = actual.siguiente;
        } while (actual != ultimo.siguiente);
    }
    
    public void mostrarAdelante() {
        if (ultimo == null) {
            System.out.println("Lista vacía");
            return;
        }
        
        NodoCircularDoble actual = ultimo.siguiente;
        
        do {
            System.out.print(actual.dato + " ");
            actual = actual.siguiente;
        } while (actual != ultimo.siguiente);
        System.out.println();
    }
    
    public void mostrarAtras() {
        if (ultimo == null) {
            System.out.println("Lista vacía");
            return;
        }
        
        NodoCircularDoble actual = ultimo;
        
        do {
            System.out.print(actual.dato + " ");
            actual = actual.anterior;
        } while (actual != ultimo);
        System.out.println();
    }
}