#include <iostream>
#include <vector>
#include <set>
using namespace std;
int main() {
    vector<int> arr = {1,2,2,3,4,4,5};
    set<int> s(arr.begin(), arr.end());
    cout << "Sin duplicados: ";
    for (int x : s) cout << x << " ";
}
