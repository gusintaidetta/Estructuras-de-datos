class NodoCircular {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaCircular {
    constructor() {
        this.ultimo = null;
    }
    
    insertarVacio(dato) {
        const nuevo = new NodoCircular(dato);
        nuevo.siguiente = nuevo;
        this.ultimo = nuevo;
    }
    
    insertarInicio(dato) {
        if (!this.ultimo) {
            this.insertarVacio(dato);
            return;
        }
        
        const nuevo = new NodoCircular(dato);
        nuevo.siguiente = this.ultimo.siguiente;
        this.ultimo.siguiente = nuevo;
    }
    
    insertarFinal(dato) {
        if (!this.ultimo) {
            this.insertarVacio(dato);
            return;
        }
        
        const nuevo = new NodoCircular(dato);
        nuevo.siguiente = this.ultimo.siguiente;
        this.ultimo.siguiente = nuevo;
        this.ultimo = nuevo;
    }
    
    eliminar(dato) {
        if (!this.ultimo) return;
        
        // Caso único elemento
        if (this.ultimo.siguiente === this.ultimo) {
            if (this.ultimo.dato === dato) {
                this.ultimo = null;
            }
            return;
        }
        
        let actual = this.ultimo.siguiente;
        let anterior = this.ultimo;
        
        do {
            if (actual.dato === dato) {
                if (actual === this.ultimo) {
                    this.ultimo = anterior;
                }
                anterior.siguiente = actual.siguiente;
                return;
            }
            
            anterior = actual;
            actual = actual.siguiente;
        } while (actual !== this.ultimo.siguiente);
    }
    
    mostrar() {
        if (!this.ultimo) return [];
        
        const elementos = [];
        let actual = this.ultimo.siguiente;
        
        do {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        } while (actual !== this.ultimo.siguiente);
        
        return elementos;
    }
}