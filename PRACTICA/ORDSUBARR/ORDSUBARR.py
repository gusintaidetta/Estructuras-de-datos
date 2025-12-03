matriz = [[3,1,2],[9,5,4],[7,8,6]]

asc = [sorted(fila) for fila in matriz]
desc = [sorted(fila, reverse=True) for fila in matriz]
alt = [sorted(fila, reverse=(i%2==1)) for i,fila in enumerate(matriz)]

print("Ascendente:", asc)
print("Descendente:", desc)
print("Alternado:", alt)
