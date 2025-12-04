import os
import time

# =========================================================
#  1. MODELO DE DATOS: ÁRBOL GENERAL (N-ARIO)
#  A diferencia del binario, aquí un nodo puede tener
#  muchos hijos (una lista).
# =========================================================

class NodoArchivo:
    def __init__(self, nombre, es_carpeta=True, calificacion=None):
        self.nombre = nombre
        self.es_carpeta = es_carpeta
        self.calificacion = calificacion # Solo si es alumno
        self.hijos = [] # LISTA para guardar múltiples carpetas o alumnos

    def agregar_hijo(self, nodo_hijo):
        self.hijos.append(nodo_hijo)

class ArbolSistemaArchivos:
    def __init__(self):
        # La raíz se llama "d"
        self.raiz = NodoArchivo("d", es_carpeta=True)
        self._inicializar_directorios_default()

    def _inicializar_directorios_default(self):
        """
        Construye la estructura fija solicitada:
        d -> [ordinario, reprobado, recursar, extra]
          -> [201, 202, 203]
        """
        nombres_carpetas = ["ordinario", "reprobado", "recursar", "extra"]
        nombres_grupos = ["201", "202", "203"]

        # Creamos las 4 carpetas principales
        for nombre_cat in nombres_carpetas:
            nodo_cat = NodoArchivo(nombre_cat, es_carpeta=True)
            self.raiz.agregar_hijo(nodo_cat)

            # Dentro de cada una, creamos los 3 grupos
            for nombre_grupo in nombres_grupos:
                nodo_grupo = NodoArchivo(nombre_grupo, es_carpeta=True)
                nodo_cat.agregar_hijo(nodo_grupo)

    def insertar_alumno(self, categoria, grupo, nombre_alumno, calificacion):
        # 1. Buscar la carpeta de categoría (ordinario, extra, etc.)
        nodo_cat = self._buscar_en_lista(self.raiz.hijos, categoria)
        if not nodo_cat: return False

        # 2. Buscar la carpeta del grupo (201, 202, etc.)
        nodo_grupo = self._buscar_en_lista(nodo_cat.hijos, grupo)
        if not nodo_grupo: return False

        # 3. Crear el archivo del alumno y agregarlo a la lista de hijos del grupo
        nuevo_alumno = NodoArchivo(nombre_alumno, es_carpeta=False, calificacion=calificacion)
        nodo_grupo.agregar_hijo(nuevo_alumno)
        return True

    def _buscar_en_lista(self, lista_nodos, nombre_buscado):
        """Busca un nodo por nombre dentro de una lista específica"""
        for nodo in lista_nodos:
            if nodo.nombre == nombre_buscado:
                return nodo
        return None

    # --- Lógica de visualización (Tipo comando 'tree') ---
    def obtener_vista_arbol(self):
        buffer = []
        self._recorrido_visual(self.raiz, "", True, buffer)
        return "\n".join(buffer)

    def _recorrido_visual(self, nodo, prefijo, es_ultimo, buffer):
        # Decoración visual de ramas
        conector = "└── " if es_ultimo else "├── "
        icono = "📁" if nodo.es_carpeta else "📄"
        
        info = nodo.nombre
        if not nodo.es_carpeta:
            estado = "APROBADO" if nodo.calificacion >= 70 else "REPROBADO"
            info += f" [Calif: {nodo.calificacion}] ({estado})"

        buffer.append(f"{prefijo}{conector}{icono} {info}")

        # Preparar prefijo para los hijos
        prefijo_hijo = prefijo + ("    " if es_ultimo else "│   ")
        
        # Recorrer hijos
        cantidad_hijos = len(nodo.hijos)
        for i, hijo in enumerate(nodo.hijos):
            es_ultimo_hijo = (i == cantidad_hijos - 1)
            self._recorrido_visual(hijo, prefijo_hijo, es_ultimo_hijo, buffer)

# =========================================================
#  INTERFAZ GRÁFICA DE CONSOLA (TUI)
#  Diseño de ventanas simuladas
# =========================================================

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_marco(titulo):
    ancho = 70
    print("╔" + "═" * (ancho-2) + "╗")
    print(f"║ {titulo.center(ancho-4)} ║")
    print("╠" + "═" * (ancho-2) + "╣")

def cerrar_marco():
    ancho = 70
    print("╚" + "═" * (ancho-2) + "╝")

def pausa():
    input("\n  [Presiona ENTER para continuar...]")

# --- VENTANA 1: AGREGAR ALUMNO ---
def ventana_agregar(arbol):
    clear_screen()
    print_marco("NUEVO ARCHIVO: ALUMNO")
    print("║  Sigue los pasos para guardar al alumno en el directorio correcto. ║")
    print("║                                                                    ║")
    
    # Paso 1: Selección Categoría
    cats = ["ordinario", "reprobado", "recursar", "extra"]
    print("║  1. SELECCIONA CARPETA DE ESTADO:                                  ║")
    for i, c in enumerate(cats):
        print(f"║     [{i+1}] {c.capitalize():<54} ║")
    
    try:
        op_c = int(input("║  >> Opción: ")) - 1
        if not (0 <= op_c < len(cats)): raise ValueError
        categoria = cats[op_c]
    except:
        print("║  [ERROR] Selección inválida.                                       ║")
        cerrar_marco(); pausa(); return

    print("║" + "-"*68 + "║")

    # Paso 2: Selección Grupo
    grupos = ["201", "202", "203"]
    print("║  2. SELECCIONA CARPETA DE GRUPO:                                   ║")
    for i, g in enumerate(grupos):
        print(f"║     [{i+1}] Grupo {g:<51} ║")
    
    try:
        op_g = int(input("║  >> Opción: ")) - 1
        if not (0 <= op_g < len(grupos)): raise ValueError
        grupo = grupos[op_g]
    except:
        print("║  [ERROR] Selección inválida.                                       ║")
        cerrar_marco(); pausa(); return

    print("║" + "-"*68 + "║")
    
    # Paso 3: Datos
    print("║  3. INGRESE DATOS DEL ALUMNO (Lenguaje Ensamblador):               ║")
    nombre = input("║     Nombre del archivo (Alumno): ")
    try:
        calif = float(input("║     Calificación final (0-100): "))
        
        exito = arbol.insertar_alumno(categoria, grupo, nombre, calif)
        if exito:
            print("║                                                                    ║")
            print(f"║  ✅ GUARDADO EN: d/{categoria}/{grupo}/{nombre}      ║")
        else:
            print("║  ❌ ERROR: Ruta no encontrada.                                     ║")
            
    except ValueError:
        print("║  ❌ ERROR: La calificación debe ser numérica.                      ║")
    
    cerrar_marco()
    pausa()

# --- VENTANA 2: EXPLORADOR DE ARCHIVOS ---
def ventana_explorador(arbol):
    clear_screen()
    print_marco("EXPLORADOR DE DIRECTORIOS (ÁRBOL)")
    vista = arbol.obtener_vista_arbol()
    
    # Imprimir línea por línea con margen
    for linea in vista.split("\n"):
        print(f"  {linea}")
        
    print("\n")
    print("-" * 70)
    print("  Resumen: Estructura jerárquica generada dinámicamente.")
    pausa()

# --- MENÚ PRINCIPAL ---
def main():
    sistema = ArbolSistemaArchivos()
    
    while True:
        clear_screen()
        ancho = 70
        print("╔" + "═" * (ancho-2) + "╗")
        print(f"║ {'SISTEMA DE CALIFICACIONES - LENGUAJE ENSAMBLADOR'.center(ancho-4)} ║")
        print("╠" + "═" * (ancho-2) + "╣")
        print(f"║ {'v3.0 - Estructura de Árbol General'.center(ancho-4)} ║")
        print("║" + " " * (ancho-2) + "║")
        print(f"║  1. [💾] Guardar Alumno en Carpeta                                 ║")
        print(f"║  2. [📂] Abrir Explorador de Archivos (Ver Árbol)                  ║")
        print(f"║  3. [❓] Ayuda / Acerca de                                         ║")
        print(f"║  4. [❌] Salir del Sistema                                         ║")
        print("║" + " " * (ancho-2) + "║")
        print("╚" + "═" * (ancho-2) + "╝")
        
        op = input("\n  Seleccione una opción: ")
        
        if op == '1':
            ventana_agregar(sistema)
        elif op == '2':
            ventana_explorador(sistema)
        elif op == '3':
            clear_screen()
            print_marco("AYUDA TÉCNICA")
            print("║ Estructura utilizada: Árbol General (N-ario).                      ║")
            print("║ Definición: [cite: 202, 203] Colección jerárquica de nodos.        ║")
            print("║                                                                    ║")
            print("║ A diferencia de un árbol binario, aquí cada carpeta puede tener    ║")
            print("║ múltiples hijos almacenados en una lista dinámica.                 ║")
            print("║                                                                    ║")
            print("║ Raíz: 'd'                                                          ║")
            print("║ Nivel 1: Categorías (ordinario, extra...)                          ║")
            print("║ Nivel 2: Grupos (201, 202, 203)                                    ║")
            print("║ Nivel 3: Alumnos (Archivos finales)                                ║")
            cerrar_marco()
            pausa()
        elif op == '4':
            print("  Cerrando sesión..."); break
        else:
            print("  Opción no reconocida.")
            time.sleep(0.5)

if __name__ == "__main__":
    main()