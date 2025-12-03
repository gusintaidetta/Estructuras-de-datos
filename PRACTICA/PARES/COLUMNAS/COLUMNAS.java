public class columnas {
    public static void main(String[] args) {
        int[][] matriz = {{1,2,3},{4,5,6},{7,8,9}};
        int[] suma = new int[3];
        for (int i=0; i<3; i++) {
            for (int j=0; j<3; j++) {
                suma[j] += matriz[i][j];
            }
        }
        System.out.print("Suma de columnas: ");
        for (int x : suma) System.out.print(x + " ");
    }
}

