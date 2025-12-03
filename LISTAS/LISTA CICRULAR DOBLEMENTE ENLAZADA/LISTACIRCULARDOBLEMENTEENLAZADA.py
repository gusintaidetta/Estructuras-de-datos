class NodoCircularDoble:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None
        self.anterior = None

class ListaCircularDoble:
    def __init__(self):
        self.ultimo = None
    
    def insertar_vacio(self, dato):
        nuevo = NodoCircularDoble(dato)
        nuevo.siguiente = nuevo
        nuevo.anterior = nuevo
        self.ultimo = nuevo
    
    def insertar_inicio(self, dato):
        if not self.ultimo:
            self.insertar_vacio(dato)
            return
        
        nuevo = NodoCircularDoble(dato)
        nuevo.siguiente = self.ultimo.siguiente
        nuevo.anterior = self.ultimo
        self.ultimo.siguiente.anterior = nuevo
        self.ultimo.siguiente = nuevo
    
    def insertar_final(self, dato):
        if not self.ultimo:
            self.insertar_vacio(dato)
            return
        
        nuevo = NodoCircularDoble(dato)
        nuevo.siguiente = self.ultimo.siguiente
        nuevo.anterior = self.ultimo
        self.ultimo.siguiente.anterior = nuevo
        self.ultimo.siguiente = nuevo
        self.ultimo = nuevo
    
    def eliminar(self, dato):
        if not self.ultimo:
            return
        
        # Caso único elemento
        if self.ultimo.siguiente == self.ultimo and self.ultimo.dato == dato:
            self.ultimo = None
            return
        
        actual = self.ultimo.siguiente
        
        while True:
            if actual.dato == dato:
                actual.anterior.siguiente = actual.siguiente
                actual.siguiente.anterior = actual.anterior
                
                if actual == self.ultimo:
                    self.ultimo = actual.anterior
                return
            
            actual = actual.siguiente
            if actual == self.ultimo.siguiente:
                break
    
    def mostrar_adelante(self):
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
    
    def mostrar_atras(self):
        if not self.ultimo:
            return []
        
        elementos = []
        actual = self.ultimo
        
        while True:
            elementos.append(actual.dato)
            actual = actual.anterior
            if actual == self.ultimo:
                break
        
        return elementos