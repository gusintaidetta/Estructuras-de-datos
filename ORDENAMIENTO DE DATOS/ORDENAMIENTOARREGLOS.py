import time
import random
import sys
import math
import matplotlib.pyplot as plt
import numpy as np
from collections import defaultdict

# Configuración para evitar problemas de recursión
try:
    sys.setrecursionlimit(200000)
except Exception as e:
    print(f"Advertencia: No se pudo cambiar el límite de recursión. {e}")


# Lentos
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Rápidos
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        izq = arr[:mid]
        dere = arr[mid:]
        merge_sort(izq)
        merge_sort(dere)
        i = j = k = 0
        while i < len(izq) and j < len(dere):
            if izq[i] < dere[j]:
                arr[k] = izq[i]
                i += 1
            else:
                arr[k] = dere[j]
                j += 1
            k += 1
        while i < len(izq):
            arr[k] = izq[i]
            i += 1
            k += 1
        while j < len(dere):
            arr[k] = dere[j]
            j += 1
            k += 1
    return arr

def quicksort(arr):
    def _quicksort_internal(items, low, high):
        if low < high:
            pivot = items[high]
            i = low - 1
            for j in range(low, high):
                if items[j] <= pivot:
                    i += 1
                    items[i], items[j] = items[j], items[i]
            items[i + 1], items[high] = items[high], items[i + 1]
            pivot_index = i + 1
            
            _quicksort_internal(items, low, pivot_index - 1)
            _quicksort_internal(items, pivot_index + 1, high)

    _quicksort_internal(arr, 0, len(arr) - 1)
    return arr

def heap_sort(arr):
    n = len(arr)
    
    def heapify(arr, n, i):
        grande = i
        izq = 2 * i + 1
        dere = 2 * i + 2

        if izq < n and arr[i] < arr[izq]:
            grande = izq
        if dere < n and arr[grande] < arr[dere]:
            grande = dere
        if grande != i:
            arr[i], arr[grande] = arr[grande], arr[i]
            heapify(arr, n, grande)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr

def shell_sort(arr):
    n = len(arr)
    gap = 1
    while gap < n / 3:
        gap = 3 * gap + 1
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 3
    return arr

# No Comparación
def aux_radix(arr, exp):
    n = len(arr)
    output = [0] * n
    conteo = [0] * 10

    for i in range(n):
        index = (arr[i] // exp)
        conteo[index % 10] += 1

    for i in range(1, 10):
        conteo[i] += conteo[i - 1]

    i = n - 1
    while i >= 0:
        index = (arr[i] // exp)
        output[conteo[index % 10] - 1] = arr[i]
        conteo[index % 10] -= 1
        i -= 1

    for i in range(len(arr)):
        arr[i] = output[i]

def radix_sort(arr):
    if not arr:
        return arr
    if len(arr) <= 1:
        return arr
    
    max_val = max(arr)
    
    exp = 1
    while max_val // exp > 0:
        aux_radix(arr, exp)
        exp *= 10
    return arr

def bucket_sort(arr):
    if not arr:
        return arr
    if len(arr) <= 1:
        return arr

    max_val = max(arr)
    min_val = min(arr)
    rango_val = max_val - min_val
    
    if rango_val == 0:
        return arr
        
    num_buckets = len(arr)
    buckets = [[] for _ in range(num_buckets)]

    for num in arr:
        idx = math.floor((num - min_val) / rango_val * (num_buckets - 1))
        buckets[idx].append(num)
        
    for i in range(num_buckets):
        insertion_sort(buckets[i])

    k = 0
    for i in range(num_buckets):
        for j in range(len(buckets[i])):
            arr[k] = buckets[i][j]
            k += 1
    return arr

def hash_sort(arr):
    if not arr:
        return arr
    if len(arr) <= 1:
        return arr
        
    max_val = max(arr)
    min_val = min(arr)
    rango = max_val - min_val + 1
    
    conteo = [0] * rango
    
    for num in arr:
        conteo[num - min_val] += 1
        
    k = 0
    for i in range(rango):
        for _ in range(conteo[i]):
            arr[k] = i + min_val
            k += 1
    return arr

# =============================================================================
# GENERACIÓN MEJORADA DE ARREGLOS
# =============================================================================

def generar_arreglo(tamaño, estado):
    """Genera un arreglo de un tamaño y estado específico."""
    if estado == "Ordenado":
        return list(range(tamaño))
    elif estado == "Inverso":
        return list(range(tamaño - 1, -1, -1)) 
    elif estado == "Mediamente Ordenado":
        arr = list(range(tamaño))
        # Mezclar solo una parte para mantener cierto orden
        mezclar_porcentaje = 0.3  # 30% de elementos mezclados
        num_mezclar = int(tamaño * mezclar_porcentaje)
        
        for _ in range(num_mezclar):
            i, j = random.sample(range(tamaño), 2)
            arr[i], arr[j] = arr[j], arr[i]
        return arr
    elif estado == "Aleatorio":
        return [random.randint(0, tamaño * 10) for _ in range(tamaño)]
    else:
        raise ValueError(f"Estado de arreglo desconocido: {estado}")

# =============================================================================
# FUNCIONES DE ANÁLISIS Y REPORTE MEJORADAS
# =============================================================================

def imprimir_resumen_por_metodo(resultados):
    """Imprime el resumen de resultados agrupados por método."""
    print("\n" + "="*80)
    print("RESUMEN DE RESULTADOS POR MÉTODO")
    print("="*80)
    
    for algo, tamaños in resultados.items():
        print(f"\n{'='*50}")
        print(f"{algo:^50}")
        print(f"{'='*50}")
        print(f"{'Tamaño':<12} {'Ordenado':<15} {'Inverso':<15} {'Med.Ordenado':<15} {'Aleatorio':<15}")
        print(f"{'-'*80}")
        
        for tamaño in sorted(tamaños.keys()):
            tiempos = tamaños[tamaño]
            fila = f"{tamaño:<12}"
            for estado in ["Ordenado", "Inverso", "Mediamente Ordenado", "Aleatorio"]:
                tiempo = tiempos.get(estado, float('inf'))
                if tiempo == float('inf') - 1:
                    tiempo_str = "Error"
                elif tiempo > 1000:
                    tiempo_str = ">1000s"
                else:
                    tiempo_str = f"{tiempo:8.6f}"
                fila += f" {tiempo_str:<15}"
            print(fila)

def calcular_ranking(resultados):
    """Calcula el ranking de algoritmos para cada tipo de escenario."""
    print("\n" + "="*80)
    print("RANKING DE ALGORITMOS POR TIPO DE ESCENARIO")
    print("="*80)
    
    # Estructura para almacenar rankings
    rankings = defaultdict(list)
    
    tamaños = list(next(iter(resultados.values())).keys())
    estados = ["Ordenado", "Inverso", "Mediamente Ordenado", "Aleatorio"]
    
    for estado in estados:
        print(f"\n{'='*50}")
        print(f"RANKING PARA ARREGLOS {estado.upper()}")
        print(f"{'='*50}")
        
        ranking_estado = []
        
        for tamaño in tamaños:
            # Evaluar cada algoritmo para este tamaño y estado
            tiempos_algoritmo = []
            for algo in resultados.keys():
                tiempo = resultados[algo][tamaño].get(estado, float('inf'))
                tiempos_algoritmo.append((algo, tiempo, tamaño))
            
            # Ordenar por tiempo (más rápido primero)
            tiempos_algoritmo.sort(key=lambda x: x[1])
            
            # Asignar puntos (más puntos para mejor posición)
            for pos, (algo, tiempo, tam) in enumerate(tiempos_algoritmo):
                puntos = len(tiempos_algoritmo) - pos
                rankings[(estado, tam)].append((algo, puntos, tiempo))
        
        # Calcular ranking general para este estado
        puntuaciones_totales = defaultdict(float)
        for tam in tamaños:
            for algo, puntos, tiempo in rankings[(estado, tam)]:
                puntuaciones_totales[algo] += puntos
        
        # Mostrar ranking general
        ranking_general = sorted(puntuaciones_totales.items(), key=lambda x: x[1], reverse=True)
        print(f"\nRANKING GENERAL - {estado}:")
        print(f"{'Pos':<4} {'Algoritmo':<25} {'Puntuación':<12} {'Promedio Tiempo':<15}")
        print("-"*60)
        
        for pos, (algo, puntuacion) in enumerate(ranking_general, 1):
            # Calcular tiempo promedio para este algoritmo en este estado
            tiempos = []
            for tam in tamaños:
                tiempo = resultados[algo][tam].get(estado, float('inf'))
                if tiempo < float('inf') - 1:
                    tiempos.append(tiempo)
            
            avg_time = sum(tiempos) / len(tiempos) if tiempos else float('inf')
            avg_str = f"{avg_time:10.6f}s" if avg_time < float('inf') - 1 else "Error"
            
            print(f"{pos:<4} {algo:<25} {puntuacion:<12.1f} {avg_str:<15}")

def graficar_resultados_mejorado(resultados, tamaños_arr, estados_arr):
    """Genera gráficos mejorados con análisis más detallado."""
    
    # 1. Gráfico por algoritmo (igual que antes)
    print("\nGenerando gráficos por algoritmo...")
    
    fig, axes = plt.subplots(3, 4, figsize=(20, 15))
    fig.suptitle("Rendimiento de Algoritmos de Ordenamiento", fontsize=16)
    axes = axes.flatten()
    
    algoritmos = list(resultados.keys())
    
    for i, algo in enumerate(algoritmos):
        if i >= len(axes):
            break
            
        ax = axes[i]
        tamaños_data = resultados[algo]
        
        for estado in estados_arr:
            tiempos = []
            for tamaño in tamaños_arr:
                tiempo = tamaños_data[tamaño].get(estado, float('inf'))
                if tiempo < float('inf') - 1:
                    tiempos.append(tiempo)
                else:
                    tiempos.append(None)
            
            # Filtrar valores None
            tamaños_plot = [t for t, tiempo in zip(tamaños_arr, tiempos) if tiempo is not None]
            tiempos_plot = [t for t in tiempos if t is not None]
            
            if tiempos_plot:
                ax.plot(tamaños_plot, tiempos_plot, marker='o', linestyle='-', label=estado)
        
        ax.set_title(f"{algo}", fontsize=10)
        ax.set_xlabel("Tamaño del Arreglo")
        ax.set_ylabel("Tiempo (segundos)")
        ax.set_xscale('log')
        ax.set_yscale('log')
        ax.legend(fontsize=8)
        ax.grid(True, linestyle='--', alpha=0.7)
    
    # Ocultar ejes no usados
    for i in range(len(algoritmos), len(axes)):
        axes[i].set_visible(False)
    
    plt.tight_layout()
    plt.show()
    
    # 2. Gráfico comparativo por tipo de arreglo
    print("\nGenerando gráficos comparativos por tipo de arreglo...")
    
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    axes = axes.flatten()
    
    for idx, estado in enumerate(estados_arr):
        if idx >= len(axes):
            break
            
        ax = axes[idx]
        
        for algo in algoritmos:
            tiempos = []
            for tamaño in tamaños_arr:
                tiempo = resultados[algo][tamaño].get(estado, float('inf'))
                if tiempo < float('inf') - 1 and tiempo < 1000:  # Filtrar errores y tiempos muy grandes
                    tiempos.append(tiempo)
                else:
                    tiempos.append(None)
            
            # Filtrar valores None
            tamaños_plot = [t for t, tiempo in zip(tamaños_arr, tiempos) if tiempo is not None]
            tiempos_plot = [t for t in tiempos if t is not None]
            
            if tiempos_plot:
                ax.plot(tamaños_plot, tiempos_plot, marker='o', linestyle='-', label=algo, linewidth=2)
        
        ax.set_title(f"Comparación - Arreglos {estado}", fontsize=12)
        ax.set_xlabel("Tamaño del Arreglo")
        ax.set_ylabel("Tiempo (segundos)")
        ax.set_xscale('log')
        ax.set_yscale('log')
        ax.grid(True, linestyle='--', alpha=0.7)
        ax.legend(fontsize=8)
    
    plt.tight_layout()
    plt.show()

def generar_reporte_final(resultados):
    """Genera un reporte final con recomendaciones."""
    print("\n" + "="*80)
    print("REPORTE FINAL Y RECOMENDACIONES")
    print("="*80)
    
    # Análisis por categoría de algoritmo
    categorias = {
        "Algoritmos Simples": ["Bubble Sort", "Insertion Sort", "Selection Sort"],
        "Algoritmos Eficientes": ["Merge Sort", "Quicksort", "Heap Sort", "Shell Sort"],
        "Algoritmos No Comparación": ["Radix Sort", "Bucket Sort", "Hash Sort"]
    }
    
    for categoria, algoritmos in categorias.items():
        print(f"\n{categoria}:")
        print("-" * 40)
        
        for estado in ["Ordenado", "Inverso", "Mediamente Ordenado", "Aleatorio"]:
            mejor_algo = None
            mejor_tiempo = float('inf')
            
            for algo in algoritmos:
                # Calcular tiempo promedio para este algoritmo en este estado
                tiempos = []
                for tamaño in [100, 1000, 10000, 100000]:
                    tiempo = resultados[algo][tamaño].get(estado, float('inf'))
                    if tiempo < float('inf') - 1:
                        tiempos.append(tiempo)
                
                if tiempos:
                    avg_time = sum(tiempos) / len(tiempos)
                    if avg_time < mejor_tiempo:
                        mejor_tiempo = avg_time
                        mejor_algo = algo
            
            if mejor_algo:
                print(f"  {estado:<18}: {mejor_algo:<20} ({mejor_tiempo:.6f}s promedio)")
    
    print(f"\n{'CONCLUSIONES GENERALES':^80}")
    print("="*80)
    print("""
    1. Para arreglos pequeños (<1000 elementos): Insertion Sort o Shell Sort
    2. Para arreglos ordenados o casi ordenados: Insertion Sort o Shell Sort
    3. Para arreglos grandes desordenados: Quicksort o Merge Sort
    4. Para arreglos con valores en rango conocido: Hash Sort o Radix Sort
    5. Evitar Bubble Sort y Selection Sort para arreglos grandes
    """)

# =============================================================================
# FUNCIÓN PRINCIPAL MEJORADA
# =============================================================================

def ejecutar_benchmark():
    """Función principal que ejecuta todas las pruebas."""
    
    tamaños_arr = [100, 1000, 10000, 100000]
    estados_arr = ["Ordenado", "Inverso", "Mediamente Ordenado", "Aleatorio"]
    
    algoritmos = {
        # Lentos
        "Bubble Sort": bubble_sort,
        "Insertion Sort": insertion_sort,
        "Selection Sort": selection_sort,
        # Rápidos
        "Merge Sort": merge_sort,
        "Quicksort": quicksort,
        "Heap Sort": heap_sort,
        "Shell Sort": shell_sort,
        # No Comparacion
        "Radix Sort": radix_sort,
        "Bucket Sort": bucket_sort,
        "Hash Sort": hash_sort
    }
    
    # Almacenar todos los resultados
    resultados = {algo: {tamaño: {} for tamaño in tamaños_arr} for algo in algoritmos}
    
    print("INICIANDO PRUEBA COMPLETA DE ALGORITMOS DE ORDENAMIENTO")
    print("="*60)
    print(f"Tamaños: {tamaños_arr}")
    print(f"Estados: {estados_arr}")
    print(f"Algoritmos: {list(algoritmos.keys())}")
    print("="*60)
    
    total_pruebas = len(tamaños_arr) * len(estados_arr) * len(algoritmos)
    prueba_actual = 0
    
    for tamaño in tamaños_arr:
        for estado in estados_arr:
            print(f"\n--- Escenario: {tamaño:>6} elementos | {estado:<20} ---")
            
            arreglo_base = generar_arreglo(tamaño, estado)
            
            for algo_nombre, algo_func in algoritmos.items():
                prueba_actual += 1
                print(f"  [{prueba_actual:>3}/{total_pruebas}] {algo_nombre:.<25}", end='', flush=True)
                
                # Crear una copia del arreglo base para cada algoritmo
                arreglo_copia = arreglo_base.copy()
                
                try:
                    # Medir el tiempo
                    t_inicio = time.perf_counter()
                    algo_func(arreglo_copia)
                    t_fin = time.perf_counter()
                    
                    duracion = t_fin - t_inicio
                    resultados[algo_nombre][tamaño][estado] = duracion
                    print(f" {duracion:10.6f} segundos")
                    
                except RecursionError:
                    print(f" [ERROR RECURSIÓN]")
                    resultados[algo_nombre][tamaño][estado] = float('inf') - 1
                except Exception as e:
                    print(f" [ERROR: {str(e)[:30]}]")
                    resultados[algo_nombre][tamaño][estado] = float('inf') - 1
                    
    return resultados, tamaños_arr, estados_arr

# =============================================================================
# EJECUCIÓN DEL PROGRAMA
# =============================================================================

if __name__ == "__main__":
    # Ejecutar las pruebas
    print("PROYECTO DE ESTRUCTURAS DE DATOS - ANÁLISIS DE ALGORITMOS DE ORDENAMIENTO")
    print("Presiona Enter para comenzar...")
    input()
    
    resultados_finales, tamaños, estados = ejecutar_benchmark()
    
    # Generar reportes
    imprimir_resumen_por_metodo(resultados_finales)
    calcular_ranking(resultados_finales)
    generar_reporte_final(resultados_finales)
    
    # Generar gráficos
    graficar_resultados_mejorado(resultados_finales, tamaños, estados)
    
    print("\n" + "="*80)
    print("PRUEBAS FINALIZADAS EXITOSAMENTE")
    print("="*80)