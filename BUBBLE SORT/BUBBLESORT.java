public class BUBBLESORT {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] datos = {1, 4, 2, 3};
        System.out.print("Arreglo sin ordenar = ");
        for (int v : datos) System.out.print(v + " ");
        System.out.println();

        bubbleSort(datos);

        System.out.print("Arreglo ordenado   = ");
        for (int v : datos) System.out.print(v + " ");
    }
}
