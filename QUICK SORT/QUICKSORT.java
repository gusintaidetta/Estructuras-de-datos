public class QuickSort {
    static void quicksort(int[] arr, int izq, int der) {
        int i = izq, j = der, p = arr[(izq + der) / 2];
        while (i <= j) {
            while (arr[i] < p) i++;
            while (arr[j] > p) j--;
            if (i <= j) {
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
                i++; j--;
            }
        }
        if (izq < j) quicksort(arr, izq, j);
        if (i < der) quicksort(arr, i, der);
    }

    public static void main(String[] args) {
        int[] nums = {5, 2, 9, 1, 5, 6};
        quicksort(nums, 0, nums.length - 1);
        for (int n : nums) System.out.print(n + " ");
    }
}