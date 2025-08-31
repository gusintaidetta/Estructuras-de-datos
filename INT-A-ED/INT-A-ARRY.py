arreglo = []            # Lista vacía
arreglo = [10, 20, 30]  # Lista con valores iniciales


# Asignar un valor mediante índice
arreglo[0] = 99  # ahora el primer elemento vale 99


valor = arreglo[1]  # guarda 20


# Inicializar con valores por defecto
arreglo = [0] * 5   # crea [0, 0, 0, 0, 0]


# Leer un valor (ejemplo en bucle)
for i in range(len(arreglo)):
    print(f"Índice {i} -> {arreglo[i]}")
