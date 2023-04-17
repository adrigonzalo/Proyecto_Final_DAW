document.addEventListener('DOMContentLoaded', () => {
  /*El contenido de DOM se ejecuta cuando el documento HTML se haya cargado
por completo sin tener que esperar el archivo css y las imágenes se hayan
terminado de cargar. El objetivo de este comando es el documento HTML al
que hemos hecho referencia.*/

//Creamos la retícula donde se desarrolará el tetris
  const GRID_WIDTH = 10
  const GRID_HEIGHT = 20
  const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT

  const grid = createGrid();

/*querySelectorAll = método para buscar una clase por el nombre y una vez encontrado, lo 
declaramos con el nombre de la variable
Array.from() lo usamos para collect todos los divs de nuestra grid 
y convertirlos en un array para poder trabajar con ellos*/
  let squares = Array.from(grid.querySelectorAll('div'))

  //Creamos los controles para empezar el juego, el menú y otras funciones que necesitaremos
  const startBtn = document.querySelector('.button')
  const hamburgerBtn = document.querySelector('.toggler')
  const menu = document.querySelector('.menu')
  const span = document.getElementsByClassName('close')[0]

  //Puntuación y líneas completadas
  const scoreDisplay = document.querySelector('.score-display')
  const linesDisplay = document.querySelector('.lines-score')

  //Variables para la funcionalidad del juego
  let currentIndex = 0
  let currentRotation = 0
  const width = 10
  let score = 0
  let lines = 0
  let timerId
  let nextRandom = 0

  /*Los colores de las piezas harán referencia a unas imágenes prediseñadas
  para que el juego quede más estético*/
  const colors = [
    'url(img_tetris/blue_block.png)',
    'url(img_tetris/pink_block.png)',
    'url(img_tetris/purple_block.png)',
    'url(img_tetris/peach_block.png)',
    'url(img_tetris/yellow_block.png)'
  ]

//Creamos la matriz principal
  function createGrid() {
    let grid = document.querySelector(".grid")
    for (let i = 0; i < GRID_SIZE; i++) {
      let gridElement = document.createElement("div")
      grid.appendChild(gridElement)
    }

    // Definimos la base de nuestra matriz
    for (let i = 0; i < GRID_WIDTH; i++) {
      let gridElement = document.createElement("div")
      gridElement.setAttribute("class", "block3")
      grid.appendChild(gridElement)
    }

    /*Como el tamaño máximo que hemos establecido es de 16 bloques
    en donde pueden caber todas las piezas, creamos aquí otra matriz*/
    let previousGrid = document.querySelector(".previous-grid")
    for (let i = 0; i < 16; i++) {
      let gridElement = document.createElement("div")
      previousGrid.appendChild(gridElement);
    }
    return grid;
  }


  //Asignamos los controles a las teclas mediante códigos de tecla key code
  /*Le pasamos la variable e de evento, ya que es una función va a reaccionar
cuando se presionen las teclas*/
  function control(e) {
    if (e.keyCode === 39)
      moveright()
    else if (e.keyCode === 38)
      rotate()
    else if (e.keyCode === 37)
      moveleft()
    else if (e.keyCode === 40)
      moveDown()
  }

  // Determinamos que para que avance más rápido, sea pulsar la tecla de flecha hacia abajo
  document.addEventListener('keydown', control)

  //Definimos los tetrominos: L, Z, T, O, I
  //Mirar imagen para ver las rotaciones
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ]

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ]

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ]

  //Los metemos todos en un array
  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  //Hacemos que se seleccione uno de los tetrominos del array de forma aleatoria
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  let currentPosition = 4

  //Hacer aparecer los tetrominos
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('block')
      squares[currentPosition + index].style.backgroundImage = colors[random]
    })
  }

  //Hacer desaparecer los tetrominos
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('block')
      squares[currentPosition + index].style.backgroundImage = 'none'
    })
  }

  /*Función para que las piezas vayan bajando y también respondan a las
  funciones de aparecer, desaparecer y que se pause la pieza*/
  function moveDown() {
    undraw()
    currentPosition = currentPosition += width
    draw()
    freeze()
  }

  //Botón de start para empezar el juego
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  /*Mover los tetrominos hacia la derecha, a menos que estén al borde de la retícula
  o hay algo que los bloquee*/
  function moveright() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition -= 1
    }
    draw()
  }

  /*Mover los tetrominos hacia la izquierda, a menos que estén al borde de la retícula
  o hay algo que los bloquee*/
  function moveleft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -= 1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition += 1
    }
    draw()
  }

  //Función para detener el movimiento de la ficha
  function freeze() {
    // en el caso en el que la pieza se haya posicionado y no pueda seguir descendiendo
    if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') ||
     squares[currentPosition + index + width].classList.contains('block2'))) {
      // crear un segundo bloque
      current.forEach(index => squares[index + currentPosition].classList.add('block2'))
      // Hacer que un nuevo tetromino empiece a bajar
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }
  freeze()

  //Rotar el tetromino
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  //mostrar el siguiente tetromino en la mini retícula
  const displayWidth = 4
  const displaySquares = document.querySelectorAll('.previous-grid div')
  let displayIndex = 0

  //Los tetrominos próximos a aparecer sin rotarlos
  const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
  ]

  //mostrar la figura en la mini-grid
  function displayShape() {
    //hacer desaparecer la figura
    displaySquares.forEach(square => {
      square.classList.remove('block')
      square.style.backgroundImage = 'none'
    })
    smallTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('block')
      displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
    })
  }

  //Añadir la puntuación
  function addScore() {
    for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
      const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, 
        currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
      if (row.every(index => squares[index].classList.contains('block2'))) {
        score += 10
        lines += 1
        scoreDisplay.innerHTML = score
        linesDisplay.innerHTML = lines
        row.forEach(index => {
          squares[index].style.backgroundImage = 'none'
          squares[index].classList.remove('block2') || squares[index].classList.remove('block')

        })
        //concatenar los arrays
        const squaresRemoved = squares.splice(currentIndex, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  //Para dar estilos a los listeners
  hamburgerBtn.addEventListener('click', () => {
    menu.style.display = 'flex'
  })
  span.addEventListener('click', () => {
    menu.style.display = 'none'
  })

    //Game Over = función para determinar que el juego se acaba
    function gameOver() {
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        scoreDisplay.innerHTML = score
        clearInterval(timerId)
        //Ventana para anunciar que ha terminado la partida y opción para jugar otra vez
        if(confirm('GAME OVER \n ¿Jugar otra partida?')){
          window.location.reload();  
      }
      }
      
    }
    
    
})