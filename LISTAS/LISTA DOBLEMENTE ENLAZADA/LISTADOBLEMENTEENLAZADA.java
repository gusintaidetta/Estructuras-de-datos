public class ListaDoblementeEnlazada {
    class NodoDoble {
        int dato;
        NodoDoble siguiente;
        NodoDoble anterior;
        
        NodoDoble(int dato) {
            this.dato = dato;
            this.siguiente = null;
            this.anterior = null;
        }
    }
    
    private NodoDoble cabeza;
    private NodoDoble cola;
    
    public ListaDoblementeEnlazada() {
        this.cabeza = null;
        this.cola = null;
    }
    
    public void insertarInicio(int dato) {
        NodoDoble nuevo = new NodoDoble(dato);
        if (cabeza == null) {
            cabeza = cola = nuevo;
        } else {
            nuevo.siguiente = cabeza;
            cabeza.anterior = nuevo;
            cabeza = nuevo;
        }
    }
    
    public void insertarFinal(int dato) {
        NodoDoble nuevo = new NodoDoble(dato);
        if (cabeza == null) {
            cabeza = cola = nuevo;
        } else {
            nuevo.anterior = cola;
            cola.siguiente = nuevo;
            cola = nuevo;
        }
    }
    
    public void eliminar(int dato) {
        NodoDoble actual = cabeza;
        while (actual != null) {
            if (actual.dato == dato) {
                if (actual.anterior != null) {
                    actual.anterior.siguiente = actual.siguiente;
                } else {
                    cabeza = actual.siguiente;
                }
                
                if (actual.siguiente != null) {
                    actual.siguiente.anterior = actual.anterior;
                } else {
                    cola = actual.anterior;
                }
                return;
            }
            actual = actual.siguiente;
        }
    }
    
    public void mostrarAdelante() {
        NodoDoble actual = cabeza;
        while (actual != null) {
            System.out.print(actual.dato + " ");
            actual = actual.siguiente;
        }
        System.out.println();
    }
    
    public void mostrarAtras() {
        NodoDoble actual = cola;
        while (actual != null) {
            System.out.print(actual.dato + " ");
            actual = actual.anterior;
        }
        System.out.println();
    }
}