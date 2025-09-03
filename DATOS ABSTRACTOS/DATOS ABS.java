class Persona {
    String nombre;
    int edad;


    // Constructor
    Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }


    // Método
    String saludar() {
        return "Hola, soy " + nombre + " y tengo " + edad + " años.";
    }
}


// Uso del TDA
public class Main {
    public static void main(String[] args) {
        Persona p1 = new Persona("Gustavo", 20);
        System.out.println(p1.saludar());
    }
}
