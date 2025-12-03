arr = [1, 2, 2, 3, 4, 4, 5]
sin_duplicados = list(dict.fromkeys(arr))  # conserva orden
print("Sin duplicados:", sin_duplicados)
