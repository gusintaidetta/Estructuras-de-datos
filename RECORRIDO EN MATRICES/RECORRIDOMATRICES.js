let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Recorrido por FILAS
console.log("Recorrido por FILAS:");
for (let i = 0; i < matriz.length; i++) {
    let fila = "";
    for (let j = 0; j < matriz[i].length; j++) {
        fila += matriz[i][j] + " ";
    }
    console.log(fila);
}

// Recorrido por COLUMNAS
console.log("\nRecorrido por COLUMNAS:");
for (let j = 0; j < matriz[0].length; j++) {
    let columna = "";
    for (let i = 0; i < matriz.length; i++) {
        columna += matriz[i][j] + " ";
    }
    console.log(columna);
}
