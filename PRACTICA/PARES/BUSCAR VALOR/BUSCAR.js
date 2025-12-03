let matriz = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
let valor = 5;
let encontrado = matriz.some(fila => fila.includes(valor));
console.log("Encontrado:", encontrado ? "SI" : "NO");