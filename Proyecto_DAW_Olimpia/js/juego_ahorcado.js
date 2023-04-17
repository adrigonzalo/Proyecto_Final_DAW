//Constantes iniciales
const letraContenedor = document.getElementById("letra-contenedor");
const opcionesContenedor = document.getElementById("opciones-contenedor");
const usuarioInputSeccion = document.getElementById("usuario-input-seccion");
const nuevoJuegoContenedor = document.getElementById("nuevo-juego-contenedor");
const nuevoJuegoButton = document.getElementById("nuevo-juego-button");
const canvas = document.getElementById("canvas");
const resultadoTexto = document.getElementById("resultado-texto");

//Valores para las opciones de los botones
let opciones = {
  frutas: [
    "Manzana",
    "Arandano",
    "Mandarina",
    "Picotas",
    "Granada",
    "Sandia",
    "Melocoton",
    "Pera",
    "Uva",
    "Chirimoya",
    "Naranja",
    "Melon",
    "Cereza",
    "Platano",
    "Frambuesa",
  ],
  animales: ["Erizo",
   "Rinoceronte", 
   "Ardilla", 
   "Pantera", 
   "Morsa", 
   "Zebra", 
   "Perro", 
   "Gato", 
   "Caballo", 
   "Puma", 
   "Hamster", 
   "Conejo", 
   "Hipopotamo", 
   "Ballena", 
   "Serpiente",
  ],
  paises: [
    "India",
    "Hungria",
    "Alemania",
    "Dinamarca",
    "Australia",
    "Belgica",
    "Bosnia",
    "Canada",
    "Colombia",
    "Cuba",
    "España",
    "Francia",
    "Irlanda",
    "Luxemburgo",
    "Mexico",
  ],
};

//Variables para contar
let contadorAciertos = 0;
let contador = 0;

let palabraSeleccionada = "";

//Desplegar botones de opciones
const desplegarOpciones = () => {
  /*opcionesContenedor.innerHTML += `<h3>JUEGO DEL AHORCADO.</h3><br>
                                  <h4>Pincha en una de tres opciones para empezar a jugar</h4> `;*/
  let buttonCon = document.createElement("div");
  for (let valor in opciones) {
    buttonCon.innerHTML += `<button class="opciones" onclick="generarPalabra('${valor}')">${valor}</button>`;
  }
  opcionesContenedor.appendChild(buttonCon);
};

//Bloquear todos los botones
const bloqueador = () => {
  let opcionesButtons = document.querySelectorAll(".opciones");
  let letrasButtons = document.querySelectorAll(".letras");
  //Deshabilitar todas las opciones
  opcionesButtons.forEach((button) => {
    button.disabled = true;
  });

  //Deshabilitar todas las letras
  letrasButtons.forEach((button) => {
    button.disabled.true;
  });

  //Eliminar la propiedad de hide 
  nuevoJuegoContenedor.classList.remove("hide");
};

//Generador de palabras
const generarPalabra = (opcionValor) => {
  let opcionesButtons = document.querySelectorAll(".opciones");

  //Si el parametro opcionValor encuentra el boton del InnerText, resalta el boton
  opcionesButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === opcionValor) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //Para empezar esconde las letras y limpia las palabras anteriores
  letraContenedor.classList.remove("hide");
  usuarioInputSeccion.innerText = "";

  let opcionArray = opciones[opcionValor];

  //Elije una palabra al azar
  palabraSeleccionada = opcionArray[Math.floor(Math.random() * opcionArray.length)];
  palabraSeleccionada = palabraSeleccionada.toUpperCase();

  //Sustitye cada letra con un simbolo de barra baja
  let desplegarItem = palabraSeleccionada.replace(/./g, '<span class="espacios">_</span>');

  //Desplega cada elemento
  usuarioInputSeccion.innerHTML = desplegarItem;
};


//Funcion para inicializar contenido cuando cargue la pagina y cuando el usuario presione el boton de nuevo juego
const inicializar = () => {
  contadorAciertos = 0;
  contador = 0;

  //Para empezar, borramos todo el contenido y ocultamos las letras y el boton de nuevo juego
  usuarioInputSeccion.innerHTML = "";
  opcionesContenedor.innerHTML = "";
  letraContenedor.classList.add("hide");
  nuevoJuegoContenedor.classList.add("hide");
  letraContenedor.innerHTML = "";

  //Para crear los botones de las letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letras");
    
    //Pasar de numero a ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    
    //Captura del evento click para los caracteres
    button.addEventListener("click", () => {
      let charArray = palabraSeleccionada.split("");
      let guion = document.getElementsByClassName("espacios");

      //Si el array contiene el valor "clickeado", se sustituye el guion por una letra. Si no, se dibuja algo en el canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {

          //Si el caracter en el array es igual que boton "clickeado"
          if (char === button.innerText) {
            
            //Sustituye el guion con letra
            guion[index].innerText = char;
            
            //Se incrementa el contador
            contadorAciertos += 1;
            
            //Si el contador de aciertos es igual que la longitud de la letra
            if (contadorAciertos == charArray.length) {
              resultadoTexto.innerHTML = `<h2 class='victoria-msg'>Has ganado!!</h2><p>La palabra era <span>${palabraSeleccionada}</span></p>`;
              
              //Bloqueamos todos los botones
              bloqueador();
            }
          }
        });
      } else {
        //Contador de errores
        contador += 1;
        
        //Para dibujar al hombre ahorcado
        dibujarHombre(contador);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        //Si contador==6 el orden es el siguiente cabeza,cuerpo,brazo izquierdo,brazo izquierdo,pierna izquierda, pierna derecha
        if (contador == 6) {
          resultadoTexto.innerHTML = `<h2 class='perder-msg'>Has perdido!!</h2><p>La palabra era <span>${palabraSeleccionada}</span></p>`;
          bloqueador();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letraContenedor.append(button);
  }

  desplegarOpciones();

  //Llamar al canvas para limpiar el canvas anterior y crear el canvas inicial
  let { dibujoInicial } = canvasCreador();

  dibujoInicial();
};

//Canvas
const canvasCreador = () => {
  let contexto = canvas.getContext("2d");

  //Para crear una ruta dentro del canvas, utilizamos el metodo beginPath,
  //al cual se le puede asignar parametros como fromX,fromY... entre otros definidos mas abajo
  contexto.beginPath();
  contexto.strokeStyle = "#000";
  contexto.lineWidth = 2;

  //Para dibujar las lineas
  const drawLine = (fromX, fromY, toX, toY) => {
    contexto.moveTo(fromX, fromY);
    contexto.lineTo(toX, toY);
    //Con el metodo stroke() le damos bordes a la linea de dibujo
    contexto.stroke();
  };

  const cabeza = () => {
    contexto.beginPath();
    contexto.arc(70, 30, 10, 0, Math.PI * 2, true);
    contexto.stroke();
  };

  const cuerpo = () => {
    drawLine(70, 40, 70, 80);
  };

  const brazoIzquierdo = () => {
    drawLine(70, 50, 50, 70);
  };

  const brazoDerecho = () => {
    drawLine(70, 50, 90, 70);
  };

  const piernaIzquierda = () => {
    drawLine(70, 80, 50, 110);
  };

  const piernaDerecha = () => {
    drawLine(70, 80, 90, 110);
  };

  //Frame inicial
  const dibujoInicial = () => {
    
    //Limpiar canvas
    contexto.clearRect(0, 0, contexto.canvas.width, contexto.canvas.height);
    
    //Linea de abajo
    drawLine(10, 130, 130, 130);
    
    //Linea de la izquierda
    drawLine(10, 10, 10, 131);
    
    //Linea de arriba
    drawLine(10, 10, 70, 10);
    
    //Linea de arriba pequeña
    drawLine(70, 10, 70, 20);
  };

  return { dibujoInicial, cabeza, cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda, piernaDerecha };
};

//Dibujar el hombre
const dibujarHombre = (contador) => {
  let { cabeza, cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda, piernaDerecha } = canvasCreador();
  switch (contador) {
    case 1:
      cabeza();
      break;
    case 2:
      cuerpo();
      break;
    case 3:
      brazoIzquierdo();
      break;
    case 4:
      brazoDerecho();
      break;
    case 5:
      piernaIzquierda();
      break;
    case 6:
      piernaDerecha();
      break;
    default:
      break;
  }
};

//Nuevo juego
nuevoJuegoButton.addEventListener("click", inicializar);
window.onload = inicializar;