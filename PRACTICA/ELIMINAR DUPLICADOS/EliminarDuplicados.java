import java.util.*;
public class EliminarDuplicados {
    public static void main(String[] args) {
        int[] arr = {1,2,2,3,4,4,5};
        LinkedHashSet<Integer> set = new LinkedHashSet<>();
        for (int x : arr) set.add(x);
        System.out.println("Sin duplicados: " + set);
    }
}
