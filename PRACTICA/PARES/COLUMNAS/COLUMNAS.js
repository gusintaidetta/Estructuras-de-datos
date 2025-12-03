let matriz = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
let suma = Array(matriz[0].length).fill(0);
for (let i=0; i<matriz.length; i++)
  for (let j=0; j<matriz[0].length; j++)
    suma[j] += matriz[i][j];
console.log("Suma de columnas:", suma);

