import java.util.Scanner;

public class BUSQUEDALINEAL {
    public static void main(String[] args) {
        int[] arreglo = {10, 20, 30, 40, 50};
        Scanner sc = new Scanner(System.in);

        System.out.print("¿Qué número buscas? ");
        int num = sc.nextInt();

        boolean encontrado = false;
        for (int elemento : arreglo) {
            if (elemento == num) {
                encontrado = true;
                break;
            }
        }

        if (encontrado) {
            System.out.println("Elemento " + num + " encontrado en el arreglo.");
        } else {
            System.out.println("Elemento no encontrado.");
        }

        sc.close();
    }
}
