def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Ejemplo súper simple
datos = [1, 4, 2, 3,5,8,6]
print("Arreglo sin ordenar =", datos)

bubble_sort(datos)

print("Arreglo ordenado   =", datos)
