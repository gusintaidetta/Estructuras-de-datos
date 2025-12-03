matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
suma_columnas = [sum(col) for col in zip(*matriz)]
print("Suma de columnas:", suma_columnas)
