#include <iostream>
using namespace std;

void shellsort(int arr[], int n) {
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

int main() {
    int nums[] = {5, 2, 9, 1, 5, 6};
    int n = sizeof(nums)/sizeof(nums[0]);
    shellsort(nums, n);
    for (int i = 0; i < n; i++) cout << nums[i] << " ";
}
