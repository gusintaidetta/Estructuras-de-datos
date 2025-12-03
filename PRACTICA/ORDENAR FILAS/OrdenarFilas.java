import java.util.Arrays;
public class OrdenarFilas {
    public static void main(String[] args) {
        int[][] matriz = {{3,1,2},{9,5,4},{7,8,6}};
        for (int i=0; i<matriz.length; i++) {
            Arrays.sort(matriz[i]);
        }
        System.out.println("Ordenada por filas:");
        for (int[] fila : matriz) {
            System.out.println(Arrays.toString(fila));
        }
    }
}

