using System;
class Persona {
    public string nombre;
    public int edad;


    
    public Persona(string nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }


    public string Saludar() {
        return $"Hola, soy {nombre} y tengo {edad} años.";
    }
}


// Uso del DATO abs
class Program
{
    static void Main()
    {
        Persona p1 = new Persona("Gustavo", 20);
        Console.WriteLine(p1.Saludar());
    }
}