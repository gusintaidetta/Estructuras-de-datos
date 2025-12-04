class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
    }
    
    insertarInicio(dato) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = this.cabeza;
        this.cabeza = nuevo;
    }
    
    insertarFinal(dato) {
        const nuevo = new Nodo(dato);
        if (!this.cabeza) {
            this.cabeza = nuevo;
            return;
        }
        
        let actual = this.cabeza;
        while (actual.siguiente) {
            actual = actual.siguiente;
        }
        actual.siguiente = nuevo;
    }
    
    eliminar(dato) {
        if (!this.cabeza) return;
        
        if (this.cabeza.dato === dato) {
            this.cabeza = this.cabeza.siguiente;
            return;
        }
        
        let actual = this.cabeza;
        while (actual.siguiente && actual.siguiente.dato !== dato) {
            actual = actual.siguiente;
        }
        
        if (actual.siguiente) {
            actual.siguiente = actual.siguiente.siguiente;
        }
    }
    
    mostrar() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }
}