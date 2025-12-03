import numpy as np

matriz3D = [
    [[1,2],[3,4]],
    [[5,6],[7,8]]
]

for i, capa in enumerate(matriz3D):
    total = sum(sum(fila) for fila in capa)
    elementos = sum(len(fila) for fila in capa)
    print(f"Promedio de capa {i}: {total/elementos}")

