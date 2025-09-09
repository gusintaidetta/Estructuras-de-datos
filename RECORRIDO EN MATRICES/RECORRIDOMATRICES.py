
matriz = [
    [1, 2, 3],   
    [4, 5, 6],   
    [7, 8, 9]    
]

print("Recorrido por FILAS:")
for i in range(len(matriz)):          
    for j in range(len(matriz[i])):   
        print(matriz[i][j], end=" ")
    print() 


print("\nRecorrido por COLUMNAS:")
for j in range(len(matriz[0])):       
    for i in range(len(matriz)):      
        print(matriz[i][j], end=" ")
    print()  
