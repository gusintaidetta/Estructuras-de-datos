#include<bits/stdc++.h>
#include<iostream>
using namespace std;

void MenuJuego();

const int FILAS = 6;
const int COLUMNAS = 7;

template <class Rep, class Period>
void sleep_for(const chrono::duration<Rep,Period>& rel_time);

class Tablero
{
  private:
    char tablero[FILAS][COLUMNAS];

    // Mostrar tablero
    void MostrarTablero()
    {
      cout<<endl<<"\t\t---------------"<<endl;
      for(int i = 0; i < FILAS; i++)
      {
        cout<<"\t\t|";
        for (int j = 0; j < COLUMNAS; j++)
        {
          if(tablero[i][j] == 'R')
          {
            cout<<"\x1B[31m"<<tablero[i][j]<<"\033[0m";
          }
          else if(tablero[i][j] == 'A')
          {
            cout<<"\x1B[34m"<<tablero[i][j]<<"\033[0m";
          }
          else
          {
            cout<<"\x1B[37m"<<tablero[i][j]<<"\033[0m";
          }
          cout<<"|";
        }
        cout<<endl;
      }
      cout<<"\t\t---------------"<<endl;
      cout<<"\t\t|1|2|3|4|5|6|7|"<<endl;
      cout<<"\t\t---------------"<<endl;
      cout<<endl;
    }

    bool AgregarFicha(char columna, char jugador)
    {
      for(int i = FILAS - 1; i >= 0; i--)
      {
        if(tablero[i][columna] == ' ')
        {
          tablero[i][columna] = jugador;
          return true;
        }
      }
      return false;
    }

    bool RevisarHorizontal(char jugador)   // Revisa horizontal
    {
      for(int i = 0; i < FILAS; i++)
      {
        for(int j = 0; j <= COLUMNAS - 4; j++)
        {
          if(tablero[i][j] == jugador &&
             tablero[i][j + 1] == jugador &&
             tablero[i][j + 2] == jugador &&
             tablero[i][j + 3] == jugador)
          {
            return true;
          }
        }
      }
      return false;
    }

    bool RevisarVertical(char jugador)   // Revisa vertical
    {
      for(int i = 0; i <= FILAS - 4; i++)
      {
        for(int j = 0; j < COLUMNAS; j++)
        {
          if(tablero[i][j] == jugador &&
             tablero[i + 1][j] == jugador &&
             tablero[i + 2][j] == jugador &&
             tablero[i + 3][j] == jugador)
          {
            return true;
          }
        }
      }
      return false;
    }

    bool RevisarDiagonalIzq(char jugador) // diagonal ↘
    {
      for(int i = 0; i <= FILAS - 4; i++)
      {
        for(int j = 0; j <= COLUMNAS - 4; j++)
        {
          if(tablero[i][j] == jugador &&
             tablero[i + 1][j + 1] == jugador &&
             tablero[i + 2][j + 2] == jugador &&
             tablero[i + 3][j + 3] == jugador)
          {
            return true;
          }
        }
      }
      return false;
    }

    bool RevisarDiagonalDer(char jugador) // diagonal
    {
      for(int i = 0; i <= FILAS - 4; i++)
      {
        for(int j = 3; j < COLUMNAS; j++)
        {
          if(tablero[i][j] == jugador &&
             tablero[i + 1][j - 1] == jugador &&
             tablero[i + 2][j - 2] == jugador &&
             tablero[i + 3][j - 3] == jugador)
          {
            return true;
          }
        }
      }
      return false;
    }

    bool RevisarVictoria(char jugador)
    {
      return RevisarHorizontal(jugador) || RevisarVertical(jugador) ||
             RevisarDiagonalIzq(jugador) || RevisarDiagonalDer(jugador);
    }

    bool TableroLleno()
    {
      for(int i = 0; i < FILAS; i++)
      {
        for(int j = 0; j < COLUMNAS; j++)
        {
          if(tablero[i][j] == ' ')
          {
            return false;
          }
        }
      }
      return true;
    }

    void Jugar()
    {
      system("cls");
      int turno = 1;
      char entrada[10];
      char jugador1 = 'R';
      char jugador2 = 'A'; // Azul
      while(!TableroLleno())
      {
        MostrarTablero();
        if(turno == 1)
        {
          cout<<"\x1B[31mJugador 1 (Rojo) tu turno\033[0m"<<endl;
          cout<<"Elige columna (1-7): ";
          cin>>entrada;
          if(strlen(entrada) != 1 || entrada[0] < '1' || entrada[0] > '7')
          {
            cout<<endl<<endl<<"Columna inválida"<<endl;
            continue;
          }
          if(tablero[0][entrada[0] - '1'] != ' ')
          {
            cout<<endl<<endl<<"Columna llena, elige otra"<<endl;
            continue;
          }
          AgregarFicha(entrada[0] - '1', jugador1);
          if(RevisarVictoria(jugador1))
          {
            system("cls");
            cout<<"\t|   \x1B[31mJugador 1 GANA\033[0m    |"<<endl;
            MostrarTablero();
            break;
          }
          turno = 2;
        }
        else
        {
          cout<<"\x1B[34mJugador 2 (Azul) tu turno\033[0m "<<endl;
          cout<<"Elige columna (1-7): ";
          cin>>entrada;
          if(strlen(entrada) != 1 || entrada[0] < '1' || entrada[0] > '7')
          {
            cout<<endl<<endl<<"Columna inválida"<<endl;
            continue;
          }
          if(tablero[0][entrada[0] - '1'] != ' ')
          {
            cout<<endl<<endl<<"Columna llena, elige otra"<<endl;
            continue;
          }
          AgregarFicha(entrada[0] - '1', jugador2);
          if(RevisarVictoria(jugador2))
          {
            system("cls");
            cout<<"\t|   \x1B[34mJugador 2 GANA\033[0m    |"<<endl;
            MostrarTablero();
            break;
          }
          turno = 1;
        }
      }

      if(TableroLleno())
      {
        system("cls");
        cout<<"EMPATE"<<endl;
        MostrarTablero();
      }
    }

  public:
    Tablero()
    {
      for (int i = 0; i < FILAS; i++)
      {
        for (int j = 0; j < COLUMNAS; j++)
        {
          tablero[i][j] = ' ';
        }
      }
    }

    void IniciarJuego()
    {
      Jugar();
    }

};

void Reiniciar()
{
  char opcion[10];

cout<<"GRACIAS POR JUGAR!!";

  cout<<endl<<endl<<" Para reiniciar presiona 1, para salir presiona 2: ";
  cin>>opcion;
  if(strlen(opcion) == 1)
  {
    if(opcion[0] == '1')
      MenuJuego();
    else if(opcion[0] == '2')
      exit(0);
    else
    {
      cout<<endl<<" Opción incorrecta"<<endl<<endl;
      Reiniciar();
    }
  }
  else
  {
    cout<<endl<<" Opción incorrecta"<<endl<<endl;
    Reiniciar();
  }
}


void MenuJuego()
{
  Tablero tablero;
  char opcion[10];

  this_thread::sleep_for(chrono::milliseconds(900));

  system("cls");


  cout<<"Presiona '1' para iniciar el juego"<<endl;
  cout<<"Presiona '2' para salir"<<endl;


  cout<<" Ingresa tu opcion: ";
  cin>>opcion;

  if(strlen(opcion) == 1)
  {
    if(opcion[0] == '1')
      tablero.IniciarJuego();
    else if(opcion[0] == '2')
      exit(0);
    else
    {
      cout<<" Opción incorrecta"<<endl<<endl;
      MenuJuego();
    }
  }
  else
  {
    cout<<" Opción incorrecta"<<endl<<endl;
    MenuJuego();
  }
}

int main()
{
  MenuJuego();
  Reiniciar();
  return 0;
}