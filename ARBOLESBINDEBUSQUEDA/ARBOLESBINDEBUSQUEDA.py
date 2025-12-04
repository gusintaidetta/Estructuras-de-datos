import os
import sys
import time


class Nodo:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    # --- Persistencia ---
    def save_to_file(self, filename="bst_data.txt"):
        keys = []
        self._preorder_rec(self.root, keys)
        try:
            with open(filename, "w") as f:
                f.write(" ".join(map(str, keys)))
            return True # Retorna éxito para la UI
        except:
            return False

    def load_from_file(self, filename="bst_data.txt"):
        if not os.path.exists(filename):
            return 0 # 0 nodos cargados
        try:
            with open(filename, "r") as f:
                content = f.read().strip()
                if not content: return 0
                numbers = list(map(int, content.split()))
                for num in numbers:
                    self.insert(num)
                return len(numbers)
        except:
            return -1 # Error

    # --- Operaciones Básicas ---
    def insert(self, key):
        if self.root is None:
            self.root = Nodo(key)
        else:
            self._insert_rec(self.root, key)

    def _insert_rec(self, current, key):
        if key < current.key:
            if current.left is None: current.left = Nodo(key)
            else: self._insert_rec(current.left, key)
        elif key > current.key:
            if current.right is None: current.right = Nodo(key)
            else: self._insert_rec(current.right, key)
        # Si es igual, no hacemos nada (no duplicados)

    def search(self, key):
        path = []
        node = self._search_rec(self.root, key, path)
        return node, path # Retornamos el nodo y la ruta para que la UI decida cómo mostrarlo

    def _search_rec(self, current, key, path):
        if current is None: return None
        path.append(current.key)
        if key == current.key: return current
        elif key < current.key: return self._search_rec(current.left, key, path)
        else: return self._search_rec(current.right, key, path)

    def delete(self, key):
        self.root = self._delete_rec(self.root, key)

    def _delete_rec(self, current, key):
        if current is None: return current
        if key < current.key:
            current.left = self._delete_rec(current.left, key)
        elif key > current.key:
            current.right = self._delete_rec(current.right, key)
        else:
            if current.left is None and current.right is None: return None
            if current.left is None: return current.right
            elif current.right is None: return current.left
            temp = self._find_min(current.right)
            current.key = temp.key
            current.right = self._delete_rec(current.right, temp.key)
        return current

    def _find_min(self, current):
        while current.left is not None: current = current.left
        return current

    # --- Recorridos y Utilidades ---
    def inorder(self):
        res = []; self._inorder_rec(self.root, res); return res
    def _inorder_rec(self, node, res):
        if node:
            self._inorder_rec(node.left, res)
            res.append(node.key)
            self._inorder_rec(node.right, res)

    def preorder(self):
        res = []; self._preorder_rec(self.root, res); return res
    def _preorder_rec(self, node, res):
        if node:
            res.append(node.key)
            self._preorder_rec(node.left, res)
            self._preorder_rec(node.right, res)

    def postorder(self):
        res = []; self._postorder_rec(self.root, res); return res
    def _postorder_rec(self, node, res):
        if node:
            self._postorder_rec(node.left, res)
            self._postorder_rec(node.right, res)
            res.append(node.key)

    def height(self): return self._height_rec(self.root)
    def _height_rec(self, node):
        if not node: return 0
        return max(self._height_rec(node.left), self._height_rec(node.right)) + 1

    def size(self): return self._size_rec(self.root)
    def _size_rec(self, node):
        if not node: return 0
        return 1 + self._size_rec(node.left) + self._size_rec(node.right)



def clear_screen():
    # Limpia la consola: 'cls' en Windows, 'clear' en Mac/Linux
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header(title):
    """Dibuja un encabezado bonito tipo ventana"""
    print("=" * 60)
    print(f"| {title.center(56)} |")
    print("=" * 60)

def pause():
    """Pausa para que el usuario lea antes de borrar la pantalla"""
    input("\nPresiona [ENTER] para volver al menú...")

# --- VENTANAS INDIVIDUALES ---

def window_insert(tree):
    while True:
        clear_screen()
        print_header("MODO INSERTAR")
        print("| Escribe el número a agregar al árbol.")
        print("| Escribe 'v' para volver al menú principal.")
        print("-" * 60)
        
        user_input = input("  >> Ingresa número: ")
        
        if user_input.lower() == 'v':
            break
        
        try:
            val = int(user_input)
            tree.insert(val)
            print(f"\n  [OK] ¡El nodo {val} ha sido agregado exitosamente!")
            time.sleep(1) # Pequeña pausa para ver el mensaje
        except ValueError:
            print("\n  [ERROR] Solo se aceptan números enteros.")
            time.sleep(1)

def window_search(tree):
    clear_screen()
    print_header("BÚSQUEDA DE DATOS")
    val_str = input("  >> ¿Qué número deseas buscar?: ")
    try:
        val = int(val_str)
        node, path = tree.search(val)
        
        print("\n  Resultados del rastreo:")
        print("  " + "-"*30)
        if node:
            print(f"  ✅ ESTADO: ENCONTRADO")
            print(f"  🗺️  RUTA:  Inicio -> {' -> '.join(map(str, path))}")
        else:
            print(f"  ❌ ESTADO: NO EXISTE")
            print(f"  🗺️  Ruta recorrida hasta el fallo: {' -> '.join(map(str, path))}")
    except ValueError:
        print("  [ERROR] Entrada inválida.")
    pause()

def window_delete(tree):
    clear_screen()
    print_header("ELIMINAR NODO")
    print("| ¡Advertencia! Esta acción modificará la estructura.")
    print("-" * 60)
    val_str = input("  >> Número a eliminar: ")
    try:
        val = int(val_str)
        # Verificamos primero si existe para dar feedback al usuario
        node, _ = tree.search(val)
        if node:
            tree.delete(val)
            print(f"\n  🗑️  El nodo {val} fue eliminado.")
            print("  (La estructura del árbol se ha reajustado)")
        else:
            print(f"\n  ⚠️  El nodo {val} no existe en el árbol.")
    except ValueError:
        print("  [ERROR] Entrada inválida.")
    pause()

def window_reports(tree):
    clear_screen()
    print_header("REPORTES Y ESTADÍSTICAS")
    
    # Cálculos
    h = tree.height()
    s = tree.size()
    in_ord = tree.inorder()
    pre_ord = tree.preorder()
    post_ord = tree.postorder()

    print(f"  📊 Estadísticas Generales:")
    print(f"     • Altura del árbol: {h}")
    print(f"     • Total de nodos:   {s}")
    print("-" * 60)
    print("  🔄 Recorridos:")
    print(f"     1. Pre-Orden:  {pre_ord}")
    print(f"     2. In-Orden:   {in_ord}  <-- (Ordenado)")
    print(f"     3. Post-Orden: {post_ord}")
    
    print("-" * 60)
    op = input("  ¿Deseas exportar el In-Orden a un archivo? (s/n): ")
    if op.lower() == 's':
        filename = input("  Nombre del archivo (ej: reporte.txt): ")
        try:
            with open(filename, "w") as f:
                f.write(f"Reporte del Arbol BST\n")
                f.write(f"Altura: {h}\nNodos: {s}\n")
                f.write(f"Inorder: {in_ord}\n")
            print(f"  [OK] Guardado en {filename}")
        except:
            print("  [ERROR] No se pudo escribir el archivo.")
    
    pause()

def window_credits():
    clear_screen()
    print_header("ACERCA DEL PROYECTO")
    print("  | Proyecto: Gestor BST")
    print("  | Materia:  Estructura de Datos")
    print("  | Tipo:     Árbol Binario de Búsqueda")
    print("  | Estado:   Persistencia activada")
    pause()


def main():
    tree = BST()
    filename = "bst_data.txt"
    
    # Carga inicial
    clear_screen()
    print("Cargando sistema...")
    nodes_loaded = tree.load_from_file(filename)
    time.sleep(1) # Efecto dramático de carga

    while True:
        clear_screen()
        print("=" * 60)
        print(f"|  SISTEMA DE GESTIÓN DE ÁRBOLES BINARIOS (BST)    |")
        print("=" * 60)
        print(f"|  Estado: {nodes_loaded} nodos en memoria{' '*26}|")
        print("-" * 60)
        print("|  MENU PRINCIPAL:                                         |")
        print("|                                                          |")
        print("|  1. [➕] Insertar Elementos (Modo Rápido)                |")
        print("|  2. [🔍] Buscar Elemento (Con ruta)                      |")
        print("|  3. [🗑️] Eliminar Elemento                                |")
        print("|  4. [📊] Ver Reportes (Recorridos, Altura, Exportar)     |")
        print("|  5. [ℹ️] Créditos / Ayuda                                 |")
        print("|  6. [💾] Guardar y Salir                                 |")
        print("|                                                          |")
        print("=" * 60)
        
        option = input("\n  Seleccione una opción [1-6]: ")

        if option == '1':
            window_insert(tree)
            nodes_loaded = tree.size() # Actualizar contador visual
        elif option == '2':
            window_search(tree)
        elif option == '3':
            window_delete(tree)
            nodes_loaded = tree.size()
        elif option == '4':
            window_reports(tree)
        elif option == '5':
            window_credits()
        elif option == '6':
            print("\n  Guardando base de datos...")
            if tree.save_to_file(filename):
                print("  [OK] Datos guardados correctamente.")
            else:
                print("  [ERROR] No se pudo guardar el archivo.")
            time.sleep(1)
            clear_screen()
            print("Sistema cerrado. ¡Hasta luego!")
            break
        else:
            print("  Opción no válida.")
            time.sleep(0.5)

if __name__ == "__main__":
    main()