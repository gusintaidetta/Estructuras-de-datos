class NodoCircular:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class ListaCircular:
    def __init__(self):
        self.ultimo = None
    
    def insertar_vacio(self, dato):
        nuevo = NodoCircular(dato)
        nuevo.siguiente = nuevo
        self.ultimo = nuevo
    
    def insertar_inicio(self, dato):
        if not self.ultimo:
            self.insertar_vacio(dato)
            return
        
        nuevo = NodoCircular(dato)
        nuevo.siguiente = self.ultimo.siguiente
        self.ultimo.siguiente = nuevo
    
    def insertar_final(self, dato):
        if not self.ultimo:
            self.insertar_vacio(dato)
            return
        
        nuevo = NodoCircular(dato)
        nuevo.siguiente = self.ultimo.siguiente
        self.ultimo.siguiente = nuevo
        self.ultimo = nuevo
    
    def eliminar(self, dato):
        if not self.ultimo:
            return
        
        # Caso único elemento
        if self.ultimo.siguiente == self.ultimo:
            if self.ultimo.dato == dato:
                self.ultimo = None
            return
        
        actual = self.ultimo.siguiente
        anterior = self.ultimo
        
        while True:
            if actual.dato == dato:
                if actual == self.ultimo:
                    self.ultimo = anterior
                anterior.siguiente = actual.siguiente
                return
            
            anterior = actual
            actual = actual.siguiente
            if actual == self.ultimo.siguiente:
                break
    
    def mostrar(self):
        if not self.ultimo:
            return []
        
        elementos = []
        actual = self.ultimo.siguiente
        
        while True:
            elementos.append(actual.dato)
            actual = actual.siguiente
            if actual == self.ultimo.siguiente:
                break
        
        return elementos