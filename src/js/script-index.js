//base de datos local de preguntas
const bd_juego = [
  {
    id: 0,
    pregunta:
      "¿Cuánto dinero se invirtió en conjuntos inmobiliarios entre el los años 2021 y 2023?",
    op0: "$432.749.433",
    op1: "$10",
    op2: "$2.500",
    correcta: "0",
  },
  {
    id: 1,
    pregunta:
      "¿Qué cantidad de conjuntos mobiliarios se dieron a escuelas entre 2021 y 2023?",
    op0: "400",
    op1: "6.044 ",
    op2: "2",
    correcta: "1",
  },
  {
    id: 2,
    pregunta:
      "¿Cuántas jornadas de pintura se realizaron dentro del programa de embellecimiento y reparación de escuelas?",
    op0: "40",
    op1: "1",
    op2: "3",
    correcta: "0",
  },
  {
    id: 3,
    pregunta: "¿Cuánto dinero se invirtió en las obras de toda La Matanza?",
    op0: "$3.051.149.870",
    op1: "$1",
    op2: "$250.000",
    correcta: "0",
  },
  {
    id: 4,
    pregunta:
      "¿Cuántas obras se realizaron entre los años 2021 y 2023 en La Matanza?",
    op0: "8",
    op1: "11",
    op2: "242",
    correcta: "2",
  },
  {
    id: 5,
    pregunta: "¿Cuántos kits de útiles se entregaron entre el año 2021 - 2023?",
    op0: "789.447",
    op1: "2",
    op2: "300",
    correcta: "0",
  },
  {
    id: 6,
    pregunta: "¿Cuál fue la inversión de dinero en kits de útiles escolares?",
    op0: "$37",
    op1: "$1.500",
    op2: "$1.437.123.437",
    correcta: "2",
  },
  {
    id: 7,
    pregunta:
      "¿Cuántos estudiantes fueron los beneficiarios del Programa de Acompañamiento de Trayectorias Educativas?",
    op0: "25.821",
    op1: "2",
    op2: "Ninguno",
    correcta: "0",
  },
  {
    id: 8,
    pregunta:
      "¿Cuál fue la inversión de dinero en el Programa de la pregunta anterior?",
    op0: "$5",
    op1: "$953.682.000",
    op2: "$19",
    correcta: "1",
  },
  {
    id: 9,
    pregunta:
      "¿Cuántos libros fueron entregados en los 3 niveles educativos (Primaria, Secundaria e Inicial)?",
    op0: "5",
    op1: "100",
    op2: "2.800.000",
    correcta: "2",
  },
  {
    id: 10,
    pregunta:
      "¿Cuál fue la inversión de dinero realizada en los libros entregados a las escuelas?",
    op0: "$10",
    op1: "$1.535.373.459",
    op2: "$20",
    correcta: "1",
  },
  {
    id: 11,
    pregunta: "¿Cuántos kits de robótica fueron entregados a escuelas?",
    op0: "25.000 ",
    op1: "12",
    op2: "350",
    correcta: "0",
  },
  {
    id: 12,
    pregunta: "¿Cuánto dinero se invirtió en los kits de robótica?",
    op0: "$25",
    op1: "$3.051.149.870",
    op2: "$500",
    correcta: "1",
  },
  {
    id: 13,
    pregunta: "¿Cuántos docentes fueron capacitados en robótica?",
    op0: "Ninguno",
    op1: "1",
    op2: "2.500",
    correcta: "2",
  },
];

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas() {
  //tomo la pregunta actual de la bd
  const pregunta = bd_juego[numPregunta];

  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-pregunta";
  contenedor.id = pregunta.id;
  const h2 = document.createElement("h2");
  h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
  contenedor.appendChild(h2);
  const opciones = document.createElement("div");

  //vamos a crear los tres labels
  //Lo vamos a hacer mediante una funciòn.
  // A dicha función le envio el numero de label y la opcion
  // el texto, de dicho label
  const label1 = crearLabel("0", pregunta.op0);
  const label2 = crearLabel("1", pregunta.op1);
  const label3 = crearLabel("2", pregunta.op2);

  //agrego los labels al contendor de las opciones
  opciones.appendChild(label1);
  opciones.appendChild(label2);
  opciones.appendChild(label3);

  //agrego las opciones al contenedor principal
  contenedor.appendChild(opciones);
  document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion) {
  const label = document.createElement("label");
  label.id = "l" + numPregunta + num;
  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.name = "p" + numPregunta;
  input.setAttribute("onclick", "seleccionar(" + numPregunta + "," + num + ")");
  const span = document.createElement("span");
  const correccion = document.createElement("span");
  correccion.id = "p" + numPregunta + num;
  span.textContent = txtOpcion;
  label.appendChild(input);
  label.appendChild(span);
  label.appendChild(correccion);

  return label;
}

//Mediante un for cargo todas las preguntas del JSON
for (i = 0; i < bd_juego.length; i++) {
  cargarPreguntas();
  //actualizo el numero de pregunta actual
  numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida) {
  respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function () {
  //recorro el arreglo que tiene las respuestas y comparo
  for (i = 0; i < bd_juego.length; i++) {
    //cargo la pregunta
    const pregunta = bd_juego[i];
    if (pregunta.correcta == respuestas[i]) {
      //respuesta correcta
      cantiCorrectas++;
      let idCorreccion = "p" + i + pregunta.correcta;
      document.getElementById(i).className = "contenedor-pregunta correcta";
      document.getElementById(idCorreccion).innerHTML = "&check;";
      document.getElementById(idCorreccion).className = "acierto";
    } else {
      //no acerto
      let id = "p" + i + respuestas[i];
      let idCorreccion = "p" + i + pregunta.correcta;
      document.getElementById(i).className = "contenedor-pregunta incorrecta";
      document.getElementById(id).innerHTML = "&#x2715;";
      document.getElementById(id).className = "no-acierto";
      document.getElementById(idCorreccion).innerHTML = "&check;";
      document.getElementById(idCorreccion).className = "acierto";
    }
  }

  //desabilitamos todos los inputs
  let inputs = document.getElementsByTagName("input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }

  //botón corregir
  let corregir = document.getElementById("corregir");
  corregir.onclick = function () {
    let cantiCorrectas = 0; // Variable para contar las respuestas correctas
    //recorro el arreglo que tiene las respuestas y comparo
    for (i = 0; i < bd_juego.length; i++) {
      //cargo la pregunta
      const pregunta = bd_juego[i];
      if (pregunta.correcta == respuestas[i]) {
        //respuesta correcta
        cantiCorrectas++;
        let idCorreccion = "p" + i + pregunta.correcta;
        document.getElementById(i).className = "contenedor-pregunta correcta";
        document.getElementById(idCorreccion).innerHTML = "&check;";
        document.getElementById(idCorreccion).className = "acierto";
      } else {
        //no acerto
        let id = "p" + i + respuestas[i];
        let idCorreccion = "p" + i + pregunta.correcta;
        document.getElementById(i).className = "contenedor-pregunta incorrecta";
        document.getElementById(id).innerHTML = "&#x2715;";
        document.getElementById(id).className = "no-acierto";
        document.getElementById(idCorreccion).innerHTML = "&check;";
        document.getElementById(idCorreccion).className = "acierto";
      }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }

    // Ocultamos el botón de corrección existente
    corregir.style.display = "none";
  };

  //hacemos un scroll hacia arriba
  window.scrollTo(0, 0);

  //colocamos la cantidad que acerto y las que no acertó
  h2 = document.createElement("h2");
  h2.className = "resultado";
  h2.textContent =
    cantiCorrectas + " CORRECTAS - " + (14 - cantiCorrectas) + " INCORRECTAS";
  document.getElementById("juego").appendChild(h2);

  // Creamos un nuevo botón para recargar la página
  let recargarBtn = document.createElement("button");
  recargarBtn.textContent = "Jugar de Nuevo";
  recargarBtn.id = "recargar";
  recargarBtn.class = "recargar__juego";
  recargarBtn.onclick = function () {
    location.reload(); // Recarga la página
  };

  // Ocultamos el botón de "Corregir" al cargar la página
  corregir.style.display = "none";

  // Insertamos el nuevo botón después del botón de corrección
  corregir.parentNode.insertBefore(recargarBtn, corregir.nextSibling);
};
