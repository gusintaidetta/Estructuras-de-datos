using System;

class ShellSort {
    static void shellsort(int[] arr) {
        int n = arr.Length;
        for (int gap = n/2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
        }
    }

    static void Main() {
        int[] nums = {5, 2, 9, 1, 5, 6};
        shellsort(nums);
        foreach (int n in nums) Console.Write(n + " ");
    }
}
