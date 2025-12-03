let matriz = [
  [3,1,2],
  [9,5,4],
  [7,8,6]
];
let ordenada = matriz.map(fila => fila.slice().sort((a,b)=>a-b));
console.log("Ordenada por filas:", ordenada);

