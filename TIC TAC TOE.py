# Juego del Gato (Tic Tac Toe)
"""
[x]: Dibujar el tablero
[x]: Ingresar nombre de los jugadores
[x]: Asignar símbolo a cada jugador
[x]: Validar que solo ingresen números del 1 al 9
[X]: Colocar símbolo en el lugar correcto
[X]: Imprimir el tablero después de cada jugada
[x]: Calcular y mostrar el resultado
"""

instrucciones = """
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
"""

# Lista que guarda los símbolos en cada posición
tablero = []

for i in range(9):
    tablero.append(' ')


# Función para imprimir el tablero
def imprimir_tablero(tablero):
    juego = f"""

   {tablero[0]} | {tablero[1]} | {tablero[2]}
  ---|---|---
   {tablero[3]} | {tablero[4]} | {tablero[5]}
  ---|---|---
   {tablero[6]} | {tablero[7]} | {tablero[8]}

    """
    print(juego)


lugares_ocupados = []
def pedir_jugada(nombre_jugador):
    while True:
        try:
            x = int(input(f'{nombre_jugador}, elige una posición (1-9): '))
            x -= 1
            if 0 <= x < 9:
                if x in lugares_ocupados:
                    print('Ese lugar ya está ocupado. Intenta de nuevo.')
                    continue
                lugares_ocupados.append(x)  
                return x
            print('Por favor, ingresa un número entre 1 y 9.')
        except ValueError:
            print("Debes ingresar un número válido.")


def verificar_resultado(tablero, jugador_uno, jugador_dos):
    # Combinaciones ganadoras
    combinaciones = [
        [0,1,2], [3,4,5], [6,7,8],  # Filas
        [0,3,6], [1,4,7], [2,5,8],  # Columnas
        [0,4,8], [2,4,6]            # Diagonales
    ]

    for c in combinaciones:
        if tablero[c[2]] == tablero[c[3]] == tablero[c[4]] == 'X':
            print(f'🎉 ¡Felicidades {jugador_uno}! Ganaste.')
            quit('Gracias por jugar.')
        elif tablero[c[0]] == tablero[c[1]] == tablero[c[2]] == 'O':
            print(f'🎉 ¡Felicidades {jugador_dos}! Ganaste.')
            quit('Gracias por jugar.')
    return


def main():
    print("Bienvenidos al juego del Gato 🐱")
    jugador_uno = input("Ingrese el nombre del Jugador 1: ")
    jugador_dos = input("Ingrese el nombre del Jugador 2: ")
    print(f"Gracias por unirse {jugador_uno} y {jugador_dos}")
    print(instrucciones)
    print(f"El símbolo de {jugador_uno} será - X")
    print(f"El símbolo de {jugador_dos} será - O")
    input("Presiona cualquier tecla para comenzar el juego: ")
    imprimir_tablero(tablero)

    for i in range(9):
        if i % 2 == 0:
            indice = pedir_jugada(jugador_uno)
            tablero[indice] = 'X'
        else:
            indice = pedir_jugada(jugador_dos)
            tablero[indice] = 'O'

        imprimir_tablero(tablero)
        verificar_resultado(tablero, jugador_uno, jugador_dos)

    print("🤝 ¡Es un empate! Nadie ganó, intenten de nuevo.")


main()
