using System;

class QuickSort {
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

    static void Main() {
        int[] nums = {5, 2, 9, 1, 5, 6};
        quicksort(nums, 0, nums.Length - 1);
        foreach (int n in nums) Console.Write(n + " ");
    }
}
