def quicksort(arr):
    if len(arr) <= 1:
        return arr
    p = arr[len(arr)//2]
    izq = [x for x in arr if x < p]
    mid = [x for x in arr if x == p]
    der = [x for x in arr if x > p]
    return quicksort(izq) + mid + quicksort(der)

nums = [5, 2, 9, 1, 5, 6]
print(quicksort(nums))
