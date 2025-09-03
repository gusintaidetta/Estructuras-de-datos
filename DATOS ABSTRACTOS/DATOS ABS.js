class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
    }
}


// Uso del TDA
let p1 = new Persona("Gustavo", 20);
console.log(p1.saludar());
