print( """
Este será nuestro tablero del Gato:

 1 | 2 | 3 
---|---|---
 4 | 5 | 6 
---|---|---
 7 | 8 | 9 

*Instrucciones:
1. Inserta el número del lugar (1-9) donde quieras poner tu símbolo,
2. Deben llenarse los 9 lugares para obtener un resultado,
3. El jugador 1 comenzará primero.
""")
jugador_uno = input("Ingrese el nombre del Jugador 1: ")
jugador_dos = input("Ingrese el nombre del Jugador 2: ")
print(f"Gracias por unirse {jugador_uno} y {jugador_dos}")
print(f"El símbolo de {jugador_uno} será - X")
print(f"El símbolo de {jugador_dos} será - O")
input("Presiona cualquier tecla para comenzar el juego: ")
print(tablero)

tablero=[]

for i in range(9):
    tablero.append('')

juego= f"""
{tablero[0]} {tablero[1]}{tablero[2]}{tablero[3]}{tablero[4]}{tablero[5]}{tablero[6]}{tablero[7]}{tablero[8]}
"""
print(juego)

