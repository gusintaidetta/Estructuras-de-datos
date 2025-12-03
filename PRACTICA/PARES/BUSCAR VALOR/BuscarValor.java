public class BuscarValor {
    public static void main(String[] args) {
        int[][] matriz = {{1,2,3},{4,5,6},{7,8,9}};
        int valor = 5;
        boolean encontrado = false;
        for (int[] fila : matriz) {
            for (int x : fila) {
                if (x == valor) encontrado = true;
            }
        }
        System.out.println("Encontrado: " + (encontrado ? "SI" : "NO"));
    }
}
