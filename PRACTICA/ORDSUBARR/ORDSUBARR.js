
let arr = [7,2,9,4,1];
arr.sort((a,b)=>a-b);
let valor = 4;
let encontrado = arr.includes(valor);
console.log("Ordenado:", arr);
console.log("Buscar", valor, "->", encontrado ? "SI":"NO");
