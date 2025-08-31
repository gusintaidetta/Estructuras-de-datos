class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
   
    def saludar(self):
        return f"Hola, soy {self.nombre} y tengo {self.edad} años."


# Uso del TDA
p1 = Persona("Gustavo", 20)
print(p1.saludar())
