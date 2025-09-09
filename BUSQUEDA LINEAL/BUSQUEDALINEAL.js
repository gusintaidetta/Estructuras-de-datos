let arreglo = [10, 20, 30, 40, 50];

// Simulación de entrada de usuario
let num = 30;  // En navegador se podría usar: let num = parseInt(prompt("¿Qué número buscas?"));

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
