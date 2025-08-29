let idiomaActual = "en";

let modoOscuro = true;

let proyectos = [];
let tecnologias = [];

const botonEspañol = document.getElementById("botonEsp");
const botonIngles = document.getElementById("botonEng");

//Funcion que cambia el modo
function getModoTexto(){
  return modoOscuro ? "Blanco" : "Negro";
}



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
                <a href="${item.github}" target="blank"><img src="img/logos/githubLogo${getModoTexto()}.svg" alt="Github" class="githubProyecto"></a>
              </div>
    `
  });

  insertarTecnologiasProyectos(proyectos, contenedorProyectos);
}

//Funcion que inserta las tecnologias del proyecto, le paso el proyecto y el contenedor donde se insertan
function insertarTecnologiasProyectos(proyectos, contenedorProyectos){

  //Inserto las tecnologias del proyecto
  proyectos.forEach((proyecto, index) => { //Recorro los proyectos y obtengo el indice

    //Obtengo el contenedor de las tecnologias como la etiqueta con la clase tecnologiasProyecto del hijo del contenedorProyectos del indice actual
    let contenedorTecnologias = contenedorProyectos.children[index].querySelector(".tecnologiasProyecto"); 
    contenedorTecnologias.innerHTML = "";
    //Por cada tecnologia que tiene el proyecto actual
    proyecto.tecnologias.forEach(nombreTec => {
        //Obtengo la tecnologia del proyecto del arreglo de tecnologias
        let tec = tecnologias.find(t => t.name === nombreTec);
        if(tec){
          //Inserto la tecnologia
          contenedorTecnologias.innerHTML += `
              <div class="tecnologiaProy">
                  <img src="${tec.image}${getModoTexto()}.svg" alt="${tec.name}">
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
  proyectos = texto.proyectosLista;
  mostrarProyectos(proyectos);

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


//Tecnologias
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

  let listaTecnologias = document.getElementById("tecnologiasLista");
    tecnologias.forEach(item => {
      //Creo el div que contiene la imagen y el texto
      let divGeneral = document.createElement("div");
      divGeneral.classList.add("tecnologia");

      //Creo la imagen
      let imagen = document.createElement("img");
      imagen.src = `${item.image}${getModoTexto()}.svg`;
      imagen.alt = item.name;

      //Creo el texto
      let texto = document.createElement("p");
      texto.textContent = item.name;

      //Agrego la imagen y el texto al div
      divGeneral.appendChild(imagen);
      divGeneral.appendChild(texto);

      //Agrego el div general a la listaTecnologias
      listaTecnologias.appendChild(divGeneral);
    });
}


//Modo Oscuro 
function actualizarModo(){
  //Cambio icono descarga CV
  let cv = document.getElementById("imagenCV");
  cv.src= `img/logos/flechaDescarga${getModoTexto()}.svg`;
  

  //Actualizo los logos de las tecnologias de cada proyecto
  let contenedorProyectos = document.getElementById("proyectosLista");
  insertarTecnologiasProyectos(proyectos, contenedorProyectos);

  //Actualizo icono github de cada proyecto
  let githubProyectosLogos = document.querySelectorAll(".githubProyecto");
  githubProyectosLogos.forEach(img => {
    img.src = `img/logos/githubLogo${getModoTexto()}.svg`;
  });


  //Actualizo los logos de las tecnologias
  let listaTecnologias = document.getElementById("tecnologiasLista");
  listaTecnologias.innerHTML = "";
  mostrarTecnologias();

  //Cambiar color letra y fondo
  document.body.classList.toggle("claro"); //Activo o desactivo la clase claro al body

  //Cambiar iconos contacto
  let gmail = document.getElementById("gmailLogo");
  gmail.src= `img/logos/gmailLogo${getModoTexto()}.svg`;

   let github = document.getElementById("github");
   github.src= `img/logos/githubLogo${getModoTexto()}.svg`;

   let linkedin = document.getElementById("linkedin");
   linkedin.src= `img/logos/linkedinLogo${getModoTexto()}.svg`;
}

//Boton para cambiar el modo
const botonModoOscuro = document.getElementById("modoOscuro");

botonModoOscuro.addEventListener("click", function(){
  botonModoOscuro.classList.toggle("activo"); //Activar o desactivar la clase activo al boton
  modoOscuro = !modoOscuro;
  actualizarModo();
});


//Muestro las tecnologias 1 sola vez
cargarTecnologias();

// Cargar español al inicio
cargarIdioma("es");


botonMenu = document.getElementById("botonMenu");

botonMenu.addEventListener("click", function(){
  document.getElementById("botonEncabezado").classList.toggle('show'); //Activar o desactivar la clase show
});