let arreglo = [10, 20, 30, 40, 50];


let num = 30;  

let encontrado = false;
for (let elemento of arreglo) {
    if (elemento === num) {
        encontrado = true;
        break;
    }
}

if (encontrado) {
    console.log(`Elemento ${num} encontrado en el arreglo.`);
} else {
    console.log("Elemento no encontrado.");
}
