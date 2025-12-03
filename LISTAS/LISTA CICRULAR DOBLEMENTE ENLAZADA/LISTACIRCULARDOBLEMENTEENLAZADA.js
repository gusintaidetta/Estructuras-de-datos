class NodoCircularDoble {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaCircularDoble {
    constructor() {
        this.ultimo = null;
    }
    
    insertarVacio(dato) {
        const nuevo = new NodoCircularDoble(dato);
        nuevo.siguiente = nuevo;
        nuevo.anterior = nuevo;
        this.ultimo = nuevo;
    }
    
    insertarInicio(dato) {
        if (!this.ultimo) {
            this.insertarVacio(dato);
            return;
        }
        
        const nuevo = new NodoCircularDoble(dato);
        nuevo.siguiente = this.ultimo.siguiente;
        nuevo.anterior = this.ultimo;
        this.ultimo.siguiente.anterior = nuevo;
        this.ultimo.siguiente = nuevo;
    }
    
    insertarFinal(dato) {
        if (!this.ultimo) {
            this.insertarVacio(dato);
            return;
        }
        
        const nuevo = new NodoCircularDoble(dato);
        nuevo.siguiente = this.ultimo.siguiente;
        nuevo.anterior = this.ultimo;
        this.ultimo.siguiente.anterior = nuevo;
        this.ultimo.siguiente = nuevo;
        this.ultimo = nuevo;
    }
    
    eliminar(dato) {
        if (!this.ultimo) return;
        
        // Caso único elemento
        if (this.ultimo.siguiente === this.ultimo && this.ultimo.dato === dato) {
            this.ultimo = null;
            return;
        }
        
        let actual = this.ultimo.siguiente;
        
        do {
            if (actual.dato === dato) {
                actual.anterior.siguiente = actual.siguiente;
                actual.siguiente.anterior = actual.anterior;
                
                if (actual === this.ultimo) {
                    this.ultimo = actual.anterior;
                }
                return;
            }
            actual = actual.siguiente;
        } while (actual !== this.ultimo.siguiente);
    }
    
    mostrarAdelante() {
        if (!this.ultimo) return [];
        
        const elementos = [];
        let actual = this.ultimo.siguiente;
        
        do {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        } while (actual !== this.ultimo.siguiente);
        
        return elementos;
    }
    
    mostrarAtras() {
        if (!this.ultimo) return [];
        
        const elementos = [];
        let actual = this.ultimo;
        
        do {
            elementos.push(actual.dato);
            actual = actual.anterior;
        } while (actual !== this.ultimo);
        
        return elementos;
    }
}