public class MaximoMatriz {
    public static void main(String[] args) {
        int[][] matriz = {{3,8,1},{7,2,9},{4,6,5}};
        int maximo = matriz[0][0];
        for (int[] fila : matriz)
            for (int x : fila)
                if (x > maximo) maximo = x;
        System.out.println("Máximo: " + maximo);
    }
}

