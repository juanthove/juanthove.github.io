let idiomaActual = "en";

let proyectos = [];

let tecnologias = [];

const botonEspañol = document.getElementById("botonEsp");
const botonIngles = document.getElementById("botonEng");

//Inserto los proyectos en el HTML
function mostrarProyectos(proyectos){
  let contenedorProyectos = document.getElementById("proyectosLista");
  contenedorProyectos.innerHTML = "";

  //Inserto los datos principales del proyecto
  proyectos.forEach(item => {
    contenedorProyectos.innerHTML += `
              <div class="proyecto">
                <img src="${item.image}" alt= "${item.title}" class="imagenProyecto">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
                <p>${item.year}</p>
                <div class="tecnologiasProyecto"></div>
              </div>
    `
  });

  //Inserto las tecnologias del proyecto
    proyectos.forEach((proyecto, index) => { //Recorro los proyectos y obtengo el indice

      //Obtengo el contenedor de las tecnologias como la etiqueta con la clase tecnologiasProyecto del hijo del contenedorProyectos del indice actual
      let contenedorTecnologias = contenedorProyectos.children[index].querySelector(".tecnologiasProyecto"); 

      //Por cada tecnologia que tiene el proyecto actual
      proyecto.tecnologias.forEach(nombreTec => {
          //Obtengo la tecnologia del proyecto del arreglo de tecnologias
          let tec = tecnologias.find(t => t.name === nombreTec);
          if(tec){
            //Inserto la tecnologia
            contenedorTecnologias.innerHTML += `
                <div class="tecnologiaProy">
                    <img src="${tec.image}" alt="${tec.name}">
                    <p>${tec.name}</p>
                  </div>
            `
          }
          

      });
    });
}


//Cargo el idioma seleccionado y luego llamo a cambiarTexto para insertarlo
function cargarIdioma(idioma) {
  if(idioma != idiomaActual){
    fetch(`json/${idioma}.json`).then(response => {
        if (response.ok) {
          response.json().then(data => {
            cambiarTexto(data);
            idiomaActual = idioma;
          });
        } else {
          throw Error(response.statusText);
        }
      })
  }
}


//Cambio el texto segun el idioma
function cambiarTexto(texto) {
  // Insertar textos simples
  document.title = texto.title;
  document.getElementById("descargarCV").innerText = texto.cv;
  document.getElementById("sobreMi").innerText = texto.sobreMi;
  document.getElementById("textoPresentacion").innerText = texto.presentacion;

  document.querySelectorAll(".tecnologias").forEach(item => {
    item.innerText = texto.tecnologias;
  });
  document.querySelectorAll(".textoProyectos").forEach(item => {
    item.innerText = texto.proyectos;
  });
  document.querySelectorAll(".estudios").forEach(item => {
    item.innerText = texto.estudios;
  });
  document.querySelectorAll(".contacto").forEach(item => {
    item.innerText = texto.contacto;
  });

  //Insertar proyectos
  mostrarProyectos(texto.proyectosLista);

  // Insertar lista de estudios
  const listaEstudios = document.getElementById("estudiosLista");
  listaEstudios.innerHTML = "";
  texto.estudiosLista.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    listaEstudios.appendChild(li);
  });

  document.getElementById("textoContacto").innerText = texto.textoContacto;

}

botonEspañol.addEventListener("click", function(){
  cargarIdioma("es");
});

botonIngles.addEventListener("click", function(){
  cargarIdioma("en");
});


function cargarTecnologias(){
  fetch("json/tecnologias.json").then(response => {
      if (response.ok) {
        response.json().then(data => {
          tecnologias = data;
          mostrarTecnologias();
        });
      } else {
        throw Error(response.statusText);
      }
    })
}

function mostrarTecnologias(){
  const listaTecnologias = document.getElementById("tecnologiasLista");
    tecnologias.forEach(item => {
      listaTecnologias.innerHTML += `
                <div class="tecnologia">
                  <img src="${item.image}" alt="${item.name}">
                  <p>${item.name}</p>
                </div>
      `
    });
}


//Muestro las tecnologias 1 sola vez
cargarTecnologias();

// Cargar español al inicio
cargarIdioma("es");

