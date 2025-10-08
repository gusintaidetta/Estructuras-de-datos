arr = [7, 2, 9, 4, 1]
arr.sort()
valor = 4
encontrado = valor in arr
print("Ordenado:", arr)
print("Buscar", valor, "->", "SI" if encontrado else "NO")
