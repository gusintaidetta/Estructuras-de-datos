import os

# ---------------------------------------------------------
# 1. CLASE NODO
# Definición según especificación 
# ---------------------------------------------------------
class Nodo:
    def __init__(self, key):
        self.key = key          # El dato o valor (int)
        self.left = None        # Puntero al hijo izquierdo
        self.right = None       # Puntero al hijo derecho

# ---------------------------------------------------------
# 2. CLASE BST (Árbol Binario de Búsqueda)
# Implementa las operaciones del modelo de datos 
# ---------------------------------------------------------
class BST:
    def __init__(self):
        self.root = None  # La raíz empieza vacía

    # --- OPERACIÓN: INSERTAR [cite: 9, 22] ---
    def insert(self, key):
        if self.root is None:
            self.root = Nodo(key)
        else:
            self._insert_rec(self.root, key)

    def _insert_rec(self, current, key):
        # Regla BST: Izquierda < Raíz < Derecha 
        if key < current.key:
            if current.left is None:
                current.left = Nodo(key)
            else:
                self._insert_rec(current.left, key)
        elif key > current.key:
            if current.right is None:
                current.right = Nodo(key)
            else:
                self._insert_rec(current.right, key)
        else:
            print(f"El número {key} ya existe en el árbol.")

    # --- OPERACIÓN: BUSCAR (Con Ruta) [cite: 9, 26] ---
    def search(self, key):
        path = [] # Lista para guardar la ruta
        result = self._search_rec(self.root, key, path)
        if result:
            print(f"Número {key} ENCONTRADO. Ruta: {path}")
        else:
            print(f"Número {key} NO encontrado. Ruta recorrida: {path}")
        return result

    def _search_rec(self, current, key, path):
        if current is None:
            return None
        
        path.append(current.key) # Agregamos nodo actual a la ruta
        
        if key == current.key:
            return current
        elif key < current.key:
            return self._search_rec(current.left, key, path) # Buscar izq [cite: 377]
        else:
            return self._search_rec(current.right, key, path) # Buscar der [cite: 378]

    # --- OPERACIÓN: ELIMINAR [cite: 11, 27] ---
    def delete(self, key):
        self.root = self._delete_rec(self.root, key)
        print(f"Intento de eliminar {key} finalizado.")

    def _delete_rec(self, current, key):
        if current is None:
            return current

        # Buscar el nodo a eliminar
        if key < current.key:
            current.left = self._delete_rec(current.left, key)
        elif key > current.key:
            current.right = self._delete_rec(current.right, key)
        else:
            # CASO 1: Nodo Hoja (Sin hijos) [cite: 431]
            if current.left is None and current.right is None:
                return None
            
            # CASO 2: Un solo hijo [cite: 432]
            if current.left is None:
                return current.right
            elif current.right is None:
                return current.left
            
            # CASO 3: Dos hijos [cite: 433]
            # Encontrar el sucesor inorden (el menor del subárbol derecho) 
            temp = self._find_min(current.right)
            current.key = temp.key # Reemplazamos valor
            # Eliminamos el sucesor duplicado
            current.right = self._delete_rec(current.right, temp.key)

        return current

    def _find_min(self, current):
        while current.left is not None:
            current = current.left
        return current

    # --- RECORRIDOS (Inorder, Preorder, Postorder) [cite: 10, 28] ---
    def inorder(self):
        result = []
        self._inorder_rec(self.root, result)
        print("Inorder:", result)
        return result

    def _inorder_rec(self, current, result):
        if current:
            self._inorder_rec(current.left, result)
            result.append(current.key)
            self._inorder_rec(current.right, result)

    def preorder(self):
        result = []
        self._preorder_rec(self.root, result)
        print("Preorder:", result)

    def _preorder_rec(self, current, result):
        if current:
            result.append(current.key)
            self._preorder_rec(current.left, result)
            self._preorder_rec(current.right, result)

    def postorder(self):
        result = []
        self._postorder_rec(self.root, result)
        print("Postorder:", result)

    def _postorder_rec(self, current, result):
        if current:
            self._postorder_rec(current.left, result)
            self._postorder_rec(current.right, result)
            result.append(current.key)

    # --- UTILIDADES: ALTURA Y TAMAÑO [cite: 29, 30] ---
    def height(self):
        h = self._height_rec(self.root)
        # La altura se suele definir como el camino más largo (nodos - 1 o nodos).
        # Según fuente 73: altura es camino raiz a hoja.
        # Si root es None devuelve 0, si solo raiz devuelve 1.
        print(f"Altura del árbol: {h}")
        return h

    def _height_rec(self, current):
        if current is None:
            return 0
        left_h = self._height_rec(current.left)
        right_h = self._height_rec(current.right)
        return max(left_h, right_h) + 1 # [cite: 73]

    def size(self):
        s = self._size_rec(self.root)
        print(f"Número de nodos (Size): {s}")
        return s

    def _size_rec(self, current):
        if current is None:
            return 0
        return 1 + self._size_rec(current.left) + self._size_rec(current.right)

    # --- EXPORTAR ARCHIVO [cite: 19, 31] ---
    def export_inorder(self, filename="recorrido.txt"):
        data = self.inorder() # Obtiene lista inorder
        try:
            with open(filename, "w") as f:
                f.write("Recorrido Inorder: " + str(data))
            print(f"Recorrido exportado exitosamente a '{filename}'")
        except Exception as e:
            print(f"Error al escribir archivo: {e}")

# ---------------------------------------------------------
# 3. INTERFAZ DE CONSOLA
# Comandos mínimos ejecutables [cite: 20, 21]
# ---------------------------------------------------------
def main():
    tree = BST()
    print("=== GESTOR DE NÚMEROS CON ÁRBOL BINARIO (BST) ===")
    print("Escribe 'help' para ver los comandos.")

    while True:
        try:
            # Leer comando del usuario
            user_input = input("\nBST> ").strip().split()
            if not user_input:
                continue

            command = user_input[0].lower()

            if command == "exit": # [cite: 33]
                print("Saliendo del programa...")
                break
            
            elif command == "help": # [cite: 32]
                print("\n--- Comandos Disponibles ---")
                print("insert <num>   : Insertar número")
                print("search <num>   : Buscar número y ruta")
                print("delete <num>   : Eliminar número")
                print("inorder        : Mostrar recorrido Inorden")
                print("preorder       : Mostrar recorrido Preorden")
                print("postorder      : Mostrar recorrido Postorden")
                print("height         : Mostrar altura del árbol")
                print("size           : Mostrar cantidad de nodos")
                print("export         : Guardar inorden en archivo")
                print("exit           : Salir")

            elif command == "insert": # [cite: 22]
                if len(user_input) > 1:
                    num = int(user_input[1])
                    tree.insert(num)
                    print(f"-> {num} insertado.")
                else:
                    print("Error: Debes indicar el número. Ej: insert 45")

            elif command == "search": # [cite: 23]
                if len(user_input) > 1:
                    num = int(user_input[1])
                    tree.search(num)
                else:
                    print("Error: Faltó el número. Ej: search 20")

            elif command == "delete": # [cite: 24]
                if len(user_input) > 1:
                    num = int(user_input[1])
                    tree.delete(num)
                else:
                    print("Error: Faltó el número. Ej: delete 90")

            elif command == "inorder": # [cite: 28]
                tree.inorder()

            elif command == "preorder": # [cite: 28]
                tree.preorder()

            elif command == "postorder": # [cite: 28]
                tree.postorder()

            elif command == "height": # [cite: 29]
                tree.height()

            elif command == "size": # [cite: 30]
                tree.size()

            elif command == "export": # [cite: 31]
                filename = "bst_output.txt"
                if len(user_input) > 1:
                    filename = user_input[1]
                tree.export_inorder(filename)

            else:
                print("Comando no reconocido. Escribe 'help'.")

        except ValueError:
            print("Error: Por favor ingresa números enteros válidos.")
        except Exception as e:
            print(f"Ocurrió un error inesperado: {e}")

if __name__ == "__main__":
    main()