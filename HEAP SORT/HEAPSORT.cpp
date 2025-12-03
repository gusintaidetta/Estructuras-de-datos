#include <iostream>
using namespace std;

void heapify(int arr[], int n, int i) {
    int m = i;
    int l = 2*i+1;
    int r = 2*i+2;
    if (l < n && arr[l] > arr[m]) m = l;
    if (r < n && arr[r] > arr[m]) m = r;
    if (m != i) {
        int t = arr[i]; arr[i] = arr[m]; arr[m] = t;
        heapify(arr, n, m);
    }
}

void heapsort(int arr[], int n) {
    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n-1; i >= 0; i--) {
        int t = arr[0]; arr[0] = arr[i]; arr[i] = t;
        heapify(arr, i, 0);
    }
}

int main() {
    int nums[] = {5, 2, 9, 1, 5, 6};
    int n = sizeof(nums)/sizeof(nums[0]);
    heapsort(nums, n);
    for (int i = 0; i < n; i++) cout << nums[i] << " ";
}
