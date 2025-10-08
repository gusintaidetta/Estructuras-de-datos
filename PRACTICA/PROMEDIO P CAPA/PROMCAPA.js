let matriz3D = [
  [[1,2],[3,4]],
  [[5,6],[7,8]]
];

matriz3D.forEach((capa, k) => {
  let suma=0, count=0;
  capa.forEach(fila => fila.forEach(x => {suma+=x; count++;}));
  console.log("Promedio capa " + k + ":", suma/count);
});

