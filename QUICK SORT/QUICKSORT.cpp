#include <iostream>
using namespace std;

void quicksort(int arr[], int izq, int der) {
    int i = izq, j = der;
    int p = arr[(izq + der) / 2];
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

int main() {
    int nums[] = {5, 2, 9, 1, 5, 6};
    int n = sizeof(nums)/sizeof(nums[0]);
    quicksort(nums, 0, n - 1);
    for (int i = 0; i < n; i++) cout << nums[i] << " ";
}
