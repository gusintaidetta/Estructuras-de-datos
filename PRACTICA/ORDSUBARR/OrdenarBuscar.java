import java.util.Arrays;
public class OrdenarBuscar {
    public static void main(String[] args) {
        int[] arr = {7,2,9,4,1};
        Arrays.sort(arr);
        int valor = 4;
        boolean encontrado = Arrays.binarySearch(arr, valor) >= 0;
        System.out.println("Ordenado: " + Arrays.toString(arr));
        System.out.println("Buscar " + valor + " -> " + (encontrado ? "SI":"NO"));
    }
}
