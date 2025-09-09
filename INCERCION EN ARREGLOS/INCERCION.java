import java.util.ArrayList;

public class INCERCION {
    public static void main(String[] args) {
        ArrayList<Integer> arreglo = new ArrayList<>();
        
        // Agregamos algunos elementos
        arreglo.add(10);
        arreglo.add(20);
        arreglo.add(30);
        arreglo.add(40);
        arreglo.add(50);

        System.out.println("Arreglo original: " + arreglo);

        // Insertar al final
        arreglo.add(60);

        // Insertar en la posición 2
        arreglo.add(2, 25);

        System.out.println("Arreglo después de insertar: " + arreglo);
    }
}
