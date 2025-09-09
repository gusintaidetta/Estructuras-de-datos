arreglo = [10, 20, 30, 40, 50]

# Pedir número a buscar
num = int(input("¿Qué número buscas? "))

encontrado = False
for elemento in arreglo:
    if elemento == num:
        encontrado = True
        break

if encontrado:
    print(f"Elemento {num} encontrado en el arreglo.")
else:
    print("Elemento no encontrado.")
