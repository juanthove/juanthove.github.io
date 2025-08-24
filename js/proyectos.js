let proyectos = [];
let proyectoActual = 0;

const botonAnterior = document.getElementById("botonAnt");
const botonSiguiente = document.getElementById("botonSig");
const contenedor = document.getElementById("proyectos");


function mostrarProyectos(indice){
    let proyecto = proyectos[indice];
    contenedor.innerHTML = `
                <h4>${proyecto.title}</h4>
                <p>${proyecto.desc}</p>
                <p>${proyecto.year}</p>
                <img src="${proyecto.image}" alt= "${proyecto.title}" id="imagenProyecto">
    `
}

fetch("json/proyectos.json").then(response => {
      if (response.ok) {
        response.json().then(data => {
            proyectos = data;
            mostrarProyectos(0);
        });
      }else{
        throw Error(response.statusText);
      }
    })


botonAnterior.addEventListener("click", function(){
  if(proyectoActual != 0){
    proyectoActual--;
    mostrarProyectos(proyectoActual);
  }
});

botonSiguiente.addEventListener("click", function(){
  if(proyectoActual != proyectos.length-1){
    proyectoActual++;
    mostrarProyectos(proyectoActual);
  }
});