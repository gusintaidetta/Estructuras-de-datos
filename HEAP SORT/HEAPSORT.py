def heapify(arr, n, i):
    m = i
    l = 2*i+1
    r = 2*i+2
    if l < n and arr[l] > arr[m]:
        m = l
    if r < n and arr[r] > arr[m]:
        m = r
    if m != i:
        arr[i], arr[m] = arr[m], arr[i]
        heapify(arr, n, m)

def heapsort(arr):
    n = len(arr)
    for i in range(n//2-1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

nums = [5, 2, 9, 1, 5, 6]
heapsort(nums)
print(nums)
