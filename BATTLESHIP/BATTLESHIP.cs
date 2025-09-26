using System;
using System.Threading;

class Program
{
    // Tamaño del tablero (10x10)
    const int SIZE = 10;

static void Main(string[] args)
{
    char[,] tableroJugador = CrearTablero();
    char[,] tableroMaquina = CrearTablero();
       char[,] tableroTiros = CrearTablero();

        int x = 0, y = 0;

        Console.Clear();
        Console.WriteLine("===== JUEGO DE BATTLESHIP =====");
        Console.WriteLine("¿Cómo deseas colocar tus barcos?");
        Console.WriteLine("1) Colocarlos manualmente");
        Console.WriteLine("2) Colocarlos aleatoriamente");

        int opcion = 0;
        do
        {
            int.TryParse(Console.ReadLine(), out opcion);
            if (opcion == 1)
            {
                Colocar(tableroJugador);
            }
            else if (opcion == 2)
            {
                Randomizar(tableroJugador);
            }
            else
            {
                Console.WriteLine("Opción inválida, escribe 1 o 2.");
            }
        } while (opcion != 1 && opcion != 2);

        ColocarMaquina(tableroMaquina);

        Console.Clear();
        Console.WriteLine("Iniciando la partida...");
        Thread.Sleep(1500);
        Console.Clear();

        Juego(tableroJugador, tableroMaquina, tableroTiros, x, y);
}

    static char[,] CrearTablero()
    {
        char[,] tablero = new char[SIZE, SIZE];
        for (int i = 0; i < SIZE; i++)
            for (int j = 0; j < SIZE; j++)
                tablero[i, j] = '~';
        return tablero;
    }

    static void Colocar(char[,] tablero)
    {
        Console.WriteLine("Coloca tus barcos en el tablero.");
        int barcosRestantes = 10;
        int barcos1 = 4, barcos2 = 3, barcos3 = 2, barcos4 = 1;

    while (barcosRestantes > 0)
    {
            ImprimirTablero(tablero);
            Console.WriteLine("Barcos disponibles:");
            Console.WriteLine($"1) Barco de 1 casilla (Restantes: {barcos1})");
            Console.WriteLine($"2) Barco de 2 casillas (Restantes: {barcos2})");
            Console.WriteLine($"3) Barco de 3 casillas (Restantes: {barcos3})");
            Console.WriteLine($"4) Barco de 4 casillas (Restantes: {barcos4})");

            int tipo = 0;
            int.TryParse(Console.ReadLine(), out tipo);

            Console.WriteLine("Escribe las coordenadas (x y):");
            string[] coords = Console.ReadLine().Split();
            int x = int.Parse(coords[0]) - 1;
            int y = int.Parse(coords[1]) - 1;

            if (tablero[y, x] != '~')
            {
                Console.WriteLine("Ya hay un barco en esa posición.");
                Thread.Sleep(1000);
                continue;
            }

            if (tipo == 1 && barcos1 > 0)
            {
                tablero[y, x] = '1';
                barcos1--; barcosRestantes--;
            }
            else if (tipo == 2 && barcos2 > 0)
            {
                Orientacion(tablero, x, y, tipo);
                barcos2--; barcosRestantes--;
            }
            else if (tipo == 3 && barcos3 > 0)
            {
                Orientacion(tablero, x, y, tipo);
                barcos3--; barcosRestantes--;
            }
            else if (tipo == 4 && barcos4 > 0)
            {
                Orientacion(tablero, x, y, tipo);
                barcos4--; barcosRestantes--;
            }
            else
            {
                Console.WriteLine("Opción inválida o ya no tienes barcos de ese tipo.");
                Thread.Sleep(1000);
            }
    }
    }

    static void Orientacion(char[,] tablero, int x, int y, int tipo)
    {
        Console.WriteLine("Elige la orientación: 1)Arriba 2)Abajo 3)Derecha 4)Izquierda");
        bool colocado = false;

        while (!colocado)
        {
            int dir = int.Parse(Console.ReadLine());
            int dx = 0, dy = 0;
            if (dir == 1) dy = -1;
            if (dir == 2) dy = 1;
            if (dir == 3) dx = 1;
            if (dir == 4) dx = -1;

            bool valido = true;
            for (int j = 0; j < tipo; j++)
            {
                int nx = x + j * dx, ny = y + j * dy;
                if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE || tablero[ny, nx] != '~')
                {
                    valido = false;
                    break;
                }
            }

            if (valido)
            {
                for (int j = 0; j < tipo; j++)
                {
                    int nx = x + j * dx, ny = y + j * dy;
                    tablero[ny, nx] = char.Parse(tipo.ToString());
                }
                colocado = true;
            }
            else
            {
                Console.WriteLine("No se puede colocar en esa dirección, intenta otra.");
            }
        }
    }

   static void Randomizar(char[,] tablero)
{
    // barcos[0] = barcos de 1 casilla, barcos[1] = de 2, barcos[2] = de 3, barcos[3] = de 4
    int[] barcos = { 4, 3, 2, 1 };
    Random rnd = new Random();

    for (int tipo = 0; tipo < barcos.Length; tipo++)
    {
        while (barcos[tipo] > 0)
        {
            int x = rnd.Next(SIZE);
            int y = rnd.Next(SIZE);
            int dx = 0, dy = 0;

            // elige orientación al azar
            int orientacion = rnd.Next(4);
            if (orientacion == 0) dy = -1; // arriba
            if (orientacion == 1) dy = 1;  // abajo
            if (orientacion == 2) dx = 1;  // derecha
            if (orientacion == 3) dx = -1; // izquierda

            int largo = tipo + 1;
            bool valido = true;

            // revisar si cabe
            for (int i = 0; i < largo; i++)
            {
                int nx = x + i * dx;
                int ny = y + i * dy;

                if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE || tablero[ny, nx] != '~')
                {
                    valido = false;
                    break;
                }
            }

            // si cabe, se coloca
            if (valido)
            {
                for (int i = 0; i < largo; i++)
                {
                    int nx = x + i * dx;
                    int ny = y + i * dy;
                    tablero[ny, nx] = 'O';
                }
                barcos[tipo]--; // un barco menos de este tipo
            }
        }
    }
}


    static void ColocarMaquina(char[,] tablero)
    {
        Randomizar(tablero);
    }

    static void Juego(char[,] jugador, char[,] maquina, char[,] tiros, int x, int y)
    {
        int barcosJugador = 20, barcosMaquina = 20;
        int ganador = 0;
        Random rnd = new Random();

        while (ganador == 0)
        {
            Console.WriteLine("Tu tablero:");
            ImprimirTablero(jugador);
            Console.WriteLine("\nTablero enemigo:");
            ImprimirTablero(tiros);

            Console.WriteLine("Escribe las coordenadas para disparar (x y):");
            string[] entrada = Console.ReadLine().Split();
            x = int.Parse(entrada[0]) - 1;
            y = int.Parse(entrada[1]) - 1;

            if (maquina[y, x] == 'O' || Char.IsDigit(maquina[y, x]))
            {
                tiros[y, x] = 'X';
                barcosMaquina--;
                Console.WriteLine("Impacto!");
            }
            else
            {
                tiros[y, x] = 'O';
                Console.WriteLine("Fallaste.");
            }

            if (barcosMaquina <= 0) { ganador = 1; break; }

            // turno máquina
            int mx = rnd.Next(SIZE), my = rnd.Next(SIZE);
            if (jugador[my, mx] == 'O' || Char.IsDigit(jugador[my, mx]))
            {
                jugador[my, mx] = 'X';
                barcosJugador--;
                Console.WriteLine($"La máquina acertó en {mx + 1},{my + 1}");
            }
            else
            {
                jugador[my, mx] = 'O';
                Console.WriteLine($"La máquina falló en {mx + 1},{my + 1}");
            }

            if (barcosJugador <= 0) ganador = 2;

            Thread.Sleep(1000);
            Console.Clear();
        }

        if (ganador == 1)
        {
            Console.WriteLine("¡Ganaste!");
        }
        else
        {
            Console.WriteLine("Perdiste, la máquina destruyó todos tus barcos.");
        }
    }

    static void ImprimirTablero(char[,] tablero)
    {
        Console.WriteLine("    1  2  3  4  5  6  7  8  9  10");
        for (int j = 0; j < SIZE; j++)
        {
            Console.Write((j + 1).ToString().PadLeft(2) + " ");
            for (int i = 0; i < SIZE; i++)
            {
                Console.Write(" " + tablero[j, i] + " ");
            }
            Console.WriteLine();
        }
    }
}
