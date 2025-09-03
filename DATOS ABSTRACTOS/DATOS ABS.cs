using System;
class Persona {
    public string nombre;
    public int edad;


    // Constructor
    public Persona(string nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }


    // Método
    public string Saludar() {
        return $"Hola, soy {nombre} y tengo {edad} años.";
    }
}


// Uso del TDA
class Program
{
    static void Main()
    {
        Persona p1 = new Persona("Gustavo", 20);
        Console.WriteLine(p1.Saludar());
    }
}