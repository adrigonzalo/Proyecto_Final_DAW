//Con este contador vamos hacer un buvle que cada caja que encuentre tiene que añadir cada celda en ella para que en total se formen 81 casillas

contador = 0
for (var i = 0; i < 9; i++) {
    contador = 9 * i;
    document.getElementsByClassName("caja")[i].innerHTML = "<div class='celda'><input type='text' id='" + (contador + 1) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 2) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 3) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 4) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 5) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 6) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 7) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 8) + "' class='input'></div><div class='celda'><input type='text' id='" + (contador + 9) + "' class='input'></div>"
}

// inicializamos las variables de nivel y para eleguir cada tablaro(seleccionar)
var nivel;
var seleccionar;


// nivel facil crea a partir de todos estos tableros elige uno al azar

facil_tablero = ['2-5---7--45---9----2-6-81----9---8567-------2418---2----43-7-1----1---85--6---7-8',
    '----35-86-1-9-7-----269----54------------527-9--75----7-6---3-----2-----56---2-14',
    '3-549-6----396--81-5-2--1494-276-1-39---583-46-1549--7-6-1-824558-7-3-924---7-3-6',
    '47----3-------179--4-93--5----6---7-48---------2716-34-9----6----6--2381---54--1-',
    '-2--18573-31--5-96---16----5--4-26--97--86--------98--1-6--79--2-5---8144-9-7---1'
];

facil = ['215986734452869371527648193379124856781543692418937265864357219693172485936521748',
    '129735486213967854342691578543869127498315276981754632786421359675248193567832914',
    '315492678723964581857236149482765193916258374631549827967138245584713692429871356',
    '476285319523861794148932657123649578481397265952716834895137624976452381763548219',
    '429618573831245796382164957537492618974186325761259843186537942265793814459378621'];

// nivel medio crea a partir de todos estos tableros elige uno al azar 

medio_tablero = ['--6----9---75-1---1------9-9-7-25-8-3-----4-3-92-1-8-2------7---6-19--5-8----1--',
    '------27----793--892-5-63--5--87-3---34-5-79---3-87--5--63-2-819--614----57------',
    '6-5-384--2----1--9-1----9-------53--7--8-4--3--21-------7----9-8--9----6--978-3-5',
    '-8493--576--4----5---------2--84----4-1-7-6-2----28--3---------7----2--998--4721-',
    '43--7-2---2----1-----5--9-------349-741---865-241-------8--9-----6----4---7-3--61'];

medio = ['876345291982754163417638529493712568135826947359271684251968473746319825682594137',
    '834615279152793468921546387512879346634258791463987125796342581978614235857123469',
    '695138472243761589817356924428975361796854213532149687137264598851923476649782315',
    '184936257623498715372561849259847136491375682514928763673521894758162439986347215',
    '439671258825764193316582947612583497741239865924176358578429613396185742857934261'];


// nivel dificl crea a partir de todos estos tableros elige uno al azar 

dificl_tablero = ['---789-----75-8-4---38-----8---1---6---7-9---2---7---1-----61---5-3-42-----439---',
    '-6------2---9-83----6--3-79----368---2-----4---461----75-8--4----51-7---2------8-',
    '-8-------4---15--3---69-----2-73-1----9-----2-6----------19--875--9-2-1--2-835---',
    '----578------3--19---3---75-5-2-8--4------6---1-7-24---7----6----142---3---9--3--',
    '--346-5-------------9-4-8--5-9---18----4-3--7-------7--4--------9--81--6-3-71----'];

dificl = ['165789432297518346973821654847312596463729158284675931923546178851364297615439782',
    '861794532617948325156283479492536871928365147784619253753812496345127968239574681',
    '187256349428715963534691872924738156619483572861247395356194287573962418729835641',
    '143657892526738419984361275956238174843591627315782469872149635791426583267954318',
    '783461592318627954179246835569732184625493817246358971142958673497581326835719264'];

// Comenzamos con la funcion Empezar y comprobaremos cual ha sidp checked selecionado por el usuario 
function Empezar() {
    for (var i = 0; i < 6; i++) {
        document.getElementsByClassName("label")[i].setAttribute("onclick", "return false;");
    }
    tiempo();
    //Juego en nivel Facil
    if (document.getElementById("facil").checked) {
        nivel = 'facil';
        var facil_random = Math.floor(Math.random() * 5);
        // Funcion aprendida ya que con Math.random se puede realizar una eleccion al azar de cada array
        seleccionar = facil_random;
        for (var i = 0; i < 81; i++) {
            // se evalua la condicion con la variable random y se elige una y se crea el tablero 
            if (facil_tablero[facil_random][i] != '-') {
                document.getElementById((i + 1).toString()).value = facil_tablero[facil_random][i];
                document.getElementById((i + 1).toString()).readOnly = true;
            }
        }
    }

    //Juego en nivel Medio

    else if (document.getElementById("medio").checked) {
        nivel = 'medio';
        var medio_random = Math.floor(Math.random() * 5);
        seleccionar = medio_random;
        for (var i = 0; i < 81; i++) {
            if (medio_tablero[medio_random][i] != '-') {
                document.getElementById((i + 1).toString()).value = medio_tablero[medio_random][i];
                document.getElementById((i + 1).toString()).readOnly = true;
            }
        }
    }


    //Juego en nivel Dificil 

    else {
        nivel = 'dificil';
        var dificil_random = Math.floor(Math.random() * 5);
        seleccionar = dificil_random;
        for (var i = 0; i < 81; i++) {
            if (dificl_tablero[dificil_random][i] != '-') {
                document.getElementById((i + 1).toString()).value = dificl_tablero[dificil_random][i];
                document.getElementById((i + 1).toString()).readOnly = true;
            }
        }
    }


    document.getElementById("Empezar").removeAttribute("onclick");

}


// Verificacamos si ha ganado la partida o se ha equivocado de numeros y por lo cual pierde todas las vidas
var id = setInterval(() => { // con la variable id seleccionamos cada numero que vamos a introducir
    if (nivel == "facil") {
        if (document.activeElement.className == "input") { //y donde va a ser introducidoo
            if ((document.getElementById(document.activeElement.id).value == facil[seleccionar][document.activeElement.id - 1]) || (document.getElementById(document.activeElement.id).value == '')) {
                // Seguidamente compravamos cada valor introducido y si es correcto con la solucion que del tablero realizdao 
                for (var i = 0; i < 81; i++) {
                    if (i == 80 && document.getElementById((81).toString()).value != '') {// si todo esta correcto mandamos el mensaje de ganador
                        alert("Has Ganado Felicidades!!!!!!!!!");
                        clearInterval(id);
                        window.location.reload();// Funcion nueva aprendida que actualiza la pagina 
                    }
                    else if (document.getElementById((i + 1).toString()).value == '') {
                        break;
                    }
                }
            }
            else {// Si nos quedamos sin vidas mostraremos el mensaje de perdido
                if (document.getElementById("rem_vidas").innerHTML == 1) {
                    document.getElementById("rem_vidas").innerHTML == 0;
                    alert("Has perdido");
                    document.activeElement.value = '';
                    window.location.reload(); 

                }
                else {// Si todavia por lo cual tenemos vidas pues solo restaremos una.
                    alert("Te has equivocado de numero, has perdido una vida");
                    document.getElementById("rem_vidas").innerHTML = document.getElementById("rem_vidas").innerHTML - 1;
                    document.activeElement.value = '';
                }
            }

        }
    }

    else if (nivel == "medio") {// Todo esto seria lo mismo para loss niveles medio y difil 

        if (document.activeElement.className == "input") {
            if ((document.getElementById(document.activeElement.id).value == medio[seleccionar][document.activeElement.id - 1]) || (document.getElementById(document.activeElement.id).value == '')) {
                for (var i = 0; i < 81; i++) {
                    if (i == 80 && document.getElementById((81).toString()).value != '') {
                        alert("Has Ganado Felicidades!!!!!!!!!");
                        clearInterval(id);
                        window.location.reload();
                    }
                    else if (document.getElementById((i + 1).toString()).value == '') {
                        break;
                    }
                }
            }
            else { // si en cambio nos hemos quedado sin vidas se nos mostrara que hemos perdido
                if (document.getElementById("rem_vidas").innerHTML == 1) {
                    document.getElementById("rem_vidas").innerHTML == 0;
                    alert("Has perdido");
                    document.activeElement.value = '';
                    window.location.reload();

                }
                else {
                    alert("Te has equivocado de numero, has perdido una vida");
                    document.getElementById("rem_vidas").innerHTML = document.getElementById("rem_vidas").innerHTML - 1;
                    document.activeElement.value = '';
                }
            }

        }
    }

    else { // Estes seria ya el nivel dificil

        if (document.activeElement.className == "input") { 
            // Con esta llamada llamamos al input que hemos metido en cada celda realizada con el contador
            //para evaluar todos los numero metidos y ver si estan correctos  
            if ((document.getElementById(document.activeElement.id).value == dificl[seleccionar][document.activeElement.id - 1]) || (document.getElementById(document.activeElement.id).value == '')) {
                for (var i = 0; i < 81; i++) {
                    if (i == 80 && document.getElementById((81).toString()).value != '') {
                        alert("Has ganado, Felicidades !!!!");
                        clearInterval(id);
                        window.location.reload();
                    }
                    else if (document.getElementById((i + 1).toString()).value == '') {
                        break;
                    }
                }
            }
            else {
                if (document.getElementById("rem_vidas").innerHTML == 1) {
                    document.getElementById("rem_vidas").innerHTML == 0;
                    alert("Has perdido");
                    document.activeElement.value = '';
                    window.location.reload();

                }
                else {
                    alert("Numero equivocado, has perdido una vida");
                    document.getElementById("rem_vidas").innerHTML = document.getElementById("rem_vidas").innerHTML - 1;
                    document.activeElement.value = '';
                }
            }

        }
    }
}, 500);


//Nuevo Juego

function juegoNuevo() { 
    // Creamos el nuevo juego y con ello llamamos a eleccion de la funcion empezar y liempiamos el tiempo
   
    for (var i = 0; i < 81; i++) {
        document.getElementById((i + 1).toString()).value = '';

    }
    
    Empezar()
    window.location.reload(); //Actualizamos la pantalla para poder actualizar el tablero y poder elegir la dificultad
    //Limpiamos el tiempo para poder empezar de 0
    clearTimeout(tiempo); 

}


//tiempo
function tiempo() { //funcion tiempo que verifacamos cual ha sido seleccionado de todos
    // Por defecto esta seleccionado el nivel facil
    if (document.getElementById("time1").checked == true) {
        document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time1_min").innerHTML - 1).toString();
        document.getElementById("time_sec").innerHTML = '59';
    }

    else if (document.getElementById("time2").checked == true) {
        document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time2_min").innerHTML - 1).toString();
        document.getElementById("time_sec").innerHTML = '59';
    }
    else {
        document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time3_min").innerHTML - 1).toString();
        document.getElementById("time_sec").innerHTML = '59';
    }

    setInterval(() => { // Intervalo de segundo para que cada segundo sea convertido a segundo por eso el retraso de la funcion 
        //interval hace que vaya con retraso de segundos
        if (document.getElementById("time_sec").innerHTML == '00') {
            document.getElementById("time_sec").innerHTML = "59";
        }
        else {
            if (parseInt(document.getElementById("time_sec").innerHTML) <= 10) {
                document.getElementById("time_sec").innerHTML = "0" + (document.getElementById("time_sec").innerHTML - 1).toString();
            }
            else {
                document.getElementById("time_sec").innerHTML = document.getElementById("time_sec").innerHTML - 1;
            }
        }
    }, 1000);


    setInterval(() => {
        // Verificamos que cuando llegue a 0 el contador y no se ha podido realizar el juego muestre el alert 
        if (document.getElementById("time_min").innerHTML == '00') {
            document.getElementById("time_sec").innerHTML = '00';
            setTimeout(() => {
                alert("Has perdido");
            }, 50);
        }
        else {
            if (parseInt(document.getElementById("time_min").innerHTML) <= 10) {// conversion de minutos para que sean minutos y no segundos para poder restarles al string de tiempo 
                document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time_min").innerHTML - 1).toString();
            }
            else {
                document.getElementById("time_min").innerHTML = document.getElementById("time_min").innerHTML - 1;
            }
        }
    }, 60 * 1000);

}