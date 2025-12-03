using System;

class HeapSort {
    static void Heapify(int[] arr, int n, int i) {
        int m = i, l = 2*i+1, r = 2*i+2;
        if (l < n && arr[l] > arr[m]) m = l;
        if (r < n && arr[r] > arr[m]) m = r;
        if (m != i) {
            int t = arr[i]; arr[i] = arr[m]; arr[m] = t;
            Heapify(arr, n, m);
        }
    }

    static void Heapsort(int[] arr) {
        int n = arr.Length;
        for (int i = n/2-1; i >= 0; i--) Heapify(arr, n, i);
        for (int i = n-1; i >= 0; i--) {
            int t = arr[0]; arr[0] = arr[i]; arr[i] = t;
            Heapify(arr, i, 0);
        }
    }

    static void Main() {
        int[] nums = {5, 2, 9, 1, 5, 6};
        Heapsort(nums);
        foreach (int n in nums) Console.Write(n + " ");
    }
}
