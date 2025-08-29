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
  contenedorProyectos.replaceChildren();

  //Inserto los datos principales del proyecto
  proyectos.forEach(item => {
    //Creo el div que contiene la imagen y los textos
    let divGeneral = document.createElement("div");
    divGeneral.classList.add("proyecto");

    //Creo la imagen
    let imagen = document.createElement("img");
    imagen.src = item.image;
    imagen.alt = item.name;
    imagen.classList.add("imagenProyecto");

    //Creo el titulo
    let titulo = document.createElement("h4");
    titulo.textContent = item.title;

    //Creo la descripcion
    let desc = document.createElement("p");
    desc.textContent = item.desc;

    //Creo el año
    let year = document.createElement("p");
    year.textContent = item.year;

    //Creo el div de las tecnologias
    let divTecnologias = document.createElement("div");
    divTecnologias.classList.add("tecnologiasProyecto");

    //Creo el link a github
    let githubLink = document.createElement("a");
    githubLink.href = item.github;
    githubLink.target = "_blank";

    //Creo la imagen de github
    let githubImagen = document.createElement("img");
    githubImagen.src = `img/logos/githubLogo${getModoTexto()}.svg`;
    githubImagen.alt = "Github";
    githubImagen.classList.add("githubProyecto");

    //Agrego la imagen al link
    githubLink.appendChild(githubImagen);

    //Agrego todo al div general
    divGeneral.appendChild(imagen);
    divGeneral.appendChild(titulo);
    divGeneral.appendChild(desc);
    divGeneral.appendChild(year);
    divGeneral.appendChild(divTecnologias);
    divGeneral.appendChild(githubLink);
    

    //Agrego el div general al contenedorTecnologias
    contenedorProyectos.appendChild(divGeneral);

  });

  insertarTecnologiasProyectos(proyectos, contenedorProyectos);
}

//Funcion que inserta las tecnologias del proyecto, le paso el proyecto y el contenedor donde se insertan
function insertarTecnologiasProyectos(proyectos, contenedorProyectos){

  //Inserto las tecnologias del proyecto
  proyectos.forEach((proyecto, index) => { //Recorro los proyectos y obtengo el indice

    //Obtengo el contenedor de las tecnologias como la etiqueta con la clase tecnologiasProyecto del hijo del contenedorProyectos del indice actual
    let contenedorTecnologias = contenedorProyectos.children[index].querySelector(".tecnologiasProyecto"); 
    contenedorTecnologias.replaceChildren();
    //Por cada tecnologia que tiene el proyecto actual
    proyecto.tecnologias.forEach(nombreTec => {
        //Obtengo la tecnologia del proyecto del arreglo de tecnologias
        let tec = tecnologias.find(t => t.name === nombreTec);
        if(tec){
          //Inserto la tecnologia

          //Creo el div que contiene la imagen y el texto
          let divGeneral = document.createElement("div");
          divGeneral.classList.add("tecnologiaProy");

          //Creo la imagen
          let imagen = document.createElement("img");
          imagen.src = `${tec.image}${getModoTexto()}.svg`;
          imagen.alt = tec.name;

          //Creo el texto
          let texto = document.createElement("p");
          texto.textContent = tec.name;

          //Agrego la imagen y el texto al div
          divGeneral.appendChild(imagen);
          divGeneral.appendChild(texto);

          //Agrego el div general al contenedorTecnologias
          contenedorTecnologias.appendChild(divGeneral);
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
  document.getElementById("descargarCV").textContent = texto.cv;
  document.getElementById("sobreMi").textContent = texto.sobreMi;
  document.getElementById("textoPresentacion").textContent = texto.presentacion;

  document.querySelectorAll(".tecnologias").forEach(item => {
    item.textContent = texto.tecnologias;
  });
  document.querySelectorAll(".textoProyectos").forEach(item => {
    item.textContent = texto.proyectos;
  });
  document.querySelectorAll(".estudios").forEach(item => {
    item.textContent = texto.estudios;
  });
  document.querySelectorAll(".contacto").forEach(item => {
    item.textContent = texto.contacto;
  });

  //Insertar proyectos
  proyectos = texto.proyectosLista;
  mostrarProyectos(proyectos);

  // Insertar lista de estudios
  const listaEstudios = document.getElementById("estudiosLista");
  listaEstudios.replaceChildren(); //Elimino los hijos de la lista para limpiarla
  texto.estudiosLista.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listaEstudios.appendChild(li);
  });

  document.getElementById("textoContacto").textContent = texto.textoContacto;

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
  listaTecnologias.replaceChildren(); //Elimino los hijos que tenga la lista
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