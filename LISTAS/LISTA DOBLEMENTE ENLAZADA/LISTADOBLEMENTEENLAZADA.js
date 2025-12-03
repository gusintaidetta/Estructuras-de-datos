class NodoDoble {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDoblementeEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
    }
    
    insertarInicio(dato) {
        const nuevo = new NodoDoble(dato);
        if (!this.cabeza) {
            this.cabeza = this.cola = nuevo;
        } else {
            nuevo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevo;
            this.cabeza = nuevo;
        }
    }
    
    insertarFinal(dato) {
        const nuevo = new NodoDoble(dato);
        if (!this.cabeza) {
            this.cabeza = this.cola = nuevo;
        } else {
            nuevo.anterior = this.cola;
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
        }
    }
    
    eliminar(dato) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.dato === dato) {
                if (actual.anterior) {
                    actual.anterior.siguiente = actual.siguiente;
                } else {
                    this.cabeza = actual.siguiente;
                }
                
                if (actual.siguiente) {
                    actual.siguiente.anterior = actual.anterior;
                } else {
                    this.cola = actual.anterior;
                }
                return;
            }
            actual = actual.siguiente;
        }
    }
    
    mostrarAdelante() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }
    
    mostrarAtras() {
        const elementos = [];
        let actual = this.cola;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.anterior;
        }
        return elementos;
    }
}