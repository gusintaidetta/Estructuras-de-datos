public class PromedioCapa {
    public static void main(String[] args) {
        int[][][] matriz = {
            {{1,2},{3,4}},
            {{5,6},{7,8}}
        };
        for (int k=0; k<matriz.length; k++) {
            int suma=0, count=0;
            for (int i=0;i<matriz[k].length;i++)
                for (int j=0;j<matriz[k][i].length;j++) {
                    suma += matriz[k][i][j];
                    count++;
                }
            System.out.println("Promedio capa " + k + ": " + (double)suma/count);
        }
    }
}
