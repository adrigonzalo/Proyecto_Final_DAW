//Declaracion de variables
var canvas;
var ctx; //Contexto del canvas
var fps = 50; //Fotogramas por segundo
//var imgRex; 

var anchoF = 50; //Ancho de la ficha
var altoF = 50; //Alto de la ficha

var muro = '#34c62f';
var puerta = '#4286f4';
var tierra = '#c6892f';
var llave = '#c6bc00';

var enemigo = [];
var jugador1;
var imgAntorcha = [];
var tileMap;

var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
    [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
    [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
    [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0],
    [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];



function inicializar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //Inicializamos el tileMap
    tileMap = new Image();
    //Ruta de la imagen
    tileMap.src = 'img_mazmorras/tilemap.png';

    //Creamos objeto jugador
    jugador1 = new jugador();

    //Creamos un nuevo enemigo
    enemigo.push(new malos(3,3));
    enemigo.push(new malos(5,7));
    enemigo.push(new malos(7,7));

    //Creamos la antorcha
    imgAntorcha.push(new antorcha(0,0));
    imgAntorcha.push(new antorcha(14,0));
    imgAntorcha.push(new antorcha(14,9));
    imgAntorcha.push(new antorcha(0,9));

    //Inicializamos el escenario
    dibujaEscenario();

    //Evento teclado
    document.addEventListener('keydown',function(tecla){
        if(tecla.keyCode == 38){ //tecla arriba
            jugador1.arriba();
        }
        if(tecla.keyCode == 40){ //tecla abajo
            jugador1.abajo();
        }
        if(tecla.keyCode == 37){ //tecla izquierda
            jugador1.izquierda();
        }
        if(tecla.keyCode == 39){ //tecla derecha
            jugador1.derecha();
        }
    });

    //Intervalo principal
    setInterval(function(){
        principal();
    },1000/fps);
}

/*-------------------------------- CLASE JUGADOR -----------------------------------------*/
class jugador{
    constructor(){
        this.x = 1;
        this.y = 1;
        this.colorProta = "#820c01";
        this.llave = false;

        //Metodo dibujar jugador1
        this.dibuja = function(){
            //ctx.fillStyle = this.colorProta; // Color del protagonista
            //ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF); //Rellena el rectangulo con la posicion inicial del jugador

            /*Dibujamos jugador a partir de una imagen ya cargada.
            Se le indica:
            - primer parametro: Cargamos la imagen del escenario;
            - segundo parametro(32,32): Recorte de cada imagen. Cada img = 32x32 pixeles
            - tercer parametro(32,32): Tamaño a recortar
            - cuarto parametro(this.x*anchoF,this.y*altoF): Posicion en pantalla del jugador
            - quinto parametro(anchoF,altoF): Tamaño del jugador
            */
            ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);

        }

        //Metodo para controlar los margenes
        this.margenes = function(x,y){
            //Variable local para la colision
            var colision = false;

            //Buscamos la casilla del escenario que hace referencia al muro
            if(escenario[y][x] == 0){ //Comprobamos posicion inicial del jugador antes de que se mueva
                colision = true;
            }
            return(colision);
        }

        //Metodo para movimiento del jugador
        this.arriba = function(){

            if(this.margenes(this.x,this.y - 1) == false){ //Comprobamos que en cada movimiento del jugador no haya colision
                this.y--;
                this.logicaObjetos(); //Comprueba que cada vez que se mueve el jugador tiene la llave
            }
            
        }
        this.abajo = function(){
            if(this.margenes(this.x,this.y + 1) == false){ //Comprobamos que en cada movimiento del jugador no haya colision
                this.y++;    
                this.logicaObjetos(); //Comprueba que cada vez que se mueve el jugador tiene la llave
            }
        }
        this.izquierda = function(){
            if(this.margenes(this.x - 1,this.y) == false){ //Comprobamos que en cada movimiento del jugador no haya colision
                this.x--;
                this.logicaObjetos(); //Comprueba que cada vez que se mueve el jugador tiene la llave    
            }
        }
        this.derecha = function(){
            if(this.margenes(this.x + 1,this.y) == false){ //Comprobamos que en cada movimiento del jugador no haya colision
                this.x++;  
                this.logicaObjetos(); //Comprueba que cada vez que se mueve el jugador tiene la llave  
            }
        }

        //Metodo para comprobar si el jugador tiene la llave
        this.logicaObjetos = function(){
            
            var objeto = escenario[this.y][this.x];
            
            // Obtiene la llave
            if(objeto == 3){
                this.llave = true;
                escenario[this.y][this.x] = 2;
                alert("Has obtenido la llave!!");    
            }

            //Entrar puerta
            if(objeto == 1){
                if(this.llave == true){
                    this.victoria();
                }else{
                    alert("Para ganar, necesitas obtener la llave. Sigue buscando!!");
                }
            }
            
        }

        //Metodo pare comprobar una colision con un enemigo
        this.colisionEnemigo = function(x,y){
            if(this.x == x && this.y == y){
                this.muerte();
            }
        }

        //Metodo para terminar la partida
        this.victoria = function(){
            alert("Has ganado !!!");
            
            //Reset de la partida
            this.x = 1;
            this.y = 1;

            this.llave = false; //El jugador ya no tiene la llave
            escenario[8][3] = 3; // Posicion de la llave inicial
        }

        //Metodo para guardar la muerte del jugador
        this.muerte = function(){
            alert("Has muerto !!!");
            
            //Reset de la partida
            this.x = 1;
            this.y = 1;

            this.llave = false; //El jugador ya no tiene la llave
            escenario[8][3] = 3; // Posicion de la llave inicial
        }

    }
}

/*-------------------------------- CLASE ENEMIGO -----------------------------------------*/
class malos{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.direccion = Math.floor(Math.random()*4);

        //Variable para generar retras al enemigo
        this.retraso = 50;
        this.fotograma = 0; //Contador del retraso

        //Metodo dibujar enemigos
        this.dibuja = function(){
        
            /*Dibujamos enemigo a partir de una imagen ya cargada.
            Se le indica:
            - primer parametro: Cargamos la imagen del escenario;
            - segundo parametro(0,32): Recorte de cada imagen. Cada img = 32x32 pixeles
            - tercer parametro(32,32): Tamaño a recortar
            - cuarto parametro(this.x*anchoF,this.y*altoF): Posicion en pantalla del jugador
            - quinto parametro(anchoF,altoF): Tamaño del enemigo
            */
            ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);

        }

        //Metodo para encontrar colision contra un muro
        this.compruebaColision = function(x,y){
            var colisiona = false;
            
            if(escenario[y][x] == 0){
                colisiona = true;
            }
            return colisiona;
        }

        //Motodo para movimiento enemigo
        this.movimientoEnemigo = function(){

            //Pasamos los valores del jugador al enemigo 
            jugador1.colisionEnemigo(this.x,this.y);


            if(this.contador < this.retraso){
                this.contador ++;
            }else{
                this.contador = 0;
                //ARRIBA
                if(this.direccion == 0){
                    if(this.compruebaColision(this.x,this.y -1) == false){ // y -1 para comprobar movimiento hacia arriba
                        this.y--;
                    }else{
                        this.direccion = Math.floor(Math.random()*4);
                    }
                }

                //ABAJO
                if(this.direccion == 1){
                    if(this.compruebaColision(this.x,this.y +1) == false){ // y -1 para comprobar movimiento hacia arriba
                        this.y++;
                    }else{
                        this.direccion = Math.floor(Math.random()*4);
                    }
                }

                //IZQUIERDA
                if(this.direccion == 2){
                    if(this.compruebaColision(this.x - 1,this.y) == false){ // y -1 para comprobar movimiento hacia arriba
                        this.x--;
                    }else{
                        this.direccion = Math.floor(Math.random()*4);
                    }
                }

                //DERECHA
                if(this.direccion == 3){
                    if(this.compruebaColision(this.x + 1,this.y) == false){ // y -1 para comprobar movimiento hacia arriba
                        this.x++;
                    }else{
                        this.direccion = Math.floor(Math.random()*4);
                    }
                }
            }
        }
    }
}

/*-------------------------------- CLASE ANTORCHA -----------------------------------------*/
class antorcha{
    constructor(x,y){
        this.x = x;
        this.y = y;

        this.retraso = 10;
        this.contador = 0;
        this.fotograma = 0; //0-3
        

        //Metodo para cambiar el fotograma de forma secuencial 0 -> 1 -> 2 -> 3
        this.cambioFotograma = function(){
            if(this.fotograma < 3){
                this.fotograma ++;
            }else{
                this.fotograma = 0;
            }
        }
        this.dibuja = function(){
            if(this.contador < this.retraso){
                this.contador++;
            }else{
                this.contador = 0;
                this.cambioFotograma();
            }
            ctx.drawImage(tileMap,this.fotograma*32,64,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);

        }
    }
}

//Funcion para dibujar el escenario
function dibujaEscenario(){
    for(y = 0; y < 10; y++){
        for(x = 0; x < 15; x++){
            //Variable local
            var tile = escenario[y][x];

            //Dibujamos el escenario a traves de la imagen cargada
            /*drawImage(
                primer parametro: Cargamos la imagen del escenario;
                segundo parametro(tile*32,0): Recorte de cada imagen. Cada img = 32x32 pixeles
                tercer parametro(32,32): Tamaño a recortar
                cuarto parametro(anchoF*x,altoF*y): Donde tiene que poner el recorte
                quinto parametro(anchoF,altoF): Tamaño de la seccion
            );*/

            ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
            
        }
    }
}



//Borrar canvas. Para borrarlo, se cambia de tamaño el canvas definido anteriormente
function borrarCanvas(){
    canvas.width = 750;
    canvas.height = 500;
}

//Bucle principal 
function principal(){
    borrarCanvas();
    dibujaEscenario();
    jugador1.dibuja();
     
    for(c=0;c<enemigo.length;c++){
        enemigo[c].movimientoEnemigo();
        enemigo[c].dibuja();
    }

    //Dibujamos la antorcha
    for(a=0;a<imgAntorcha.length;a++){
        imgAntorcha[a].dibuja();
    }
    
}