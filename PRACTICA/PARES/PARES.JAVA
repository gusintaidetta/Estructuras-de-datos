public class PARES {
    public static void main(String[] args) {
        int[] arr = {2, 7, 4, 9, 12, 5};
        int pares = 0;
        for (int x : arr) {
            if (x % 2 == 0) pares++;
        }
        System.out.println("Cantidad de pares: " + pares);
    }
}

