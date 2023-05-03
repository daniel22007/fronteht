const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'images/ground.png'

const foodImg = new Image()
foodImg.src = 'images/food.png'

let box = 32
let score = 0

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

const snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener('keydown', direction)

let dir

function direction(event) {
    if (event.keyCode === 37 && dir !== 'right') dir = 'left'
    else if (event.keyCode === 38 && dir !== 'down') dir = 'up'
    else if (event.keyCode === 39 && dir !== 'left') dir = 'right'
    else if (event.keyCode === 40 && dir !== 'up') dir = 'down'
}


function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game)
            setModal()
        }
    }
}

function setModal() {
    const div = document.createElement('div')
    div.setAttribute('class', 'modal')
    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'game-status')
    const text = document.createElement('p')
    text.setAttribute('class', 'score')
    const btnRestart = document.createElement('button')
    btnRestart.setAttribute('class', 'restart-btn')
    const btnExit = document.createElement('button')
    btnExit.setAttribute('class', 'exit-btn')

    h1.innerText = 'Game over!'
    text.innerText = `Your score: ${score}`
    btnRestart.innerText = 'Restart'
    btnExit.innerText = 'Exit'

    div.append(h1)
    div.append(text)
    div.append(btnRestart)
    div.append(btnExit)

    document.body.append(div)

    btnRestart.onclick  = () => location.reload()

    btnExit.onclick = () => {
        canvas.style.display = 'none'
        div.style.display = 'none'
    }
}

function drawGame () {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'darkgreen' : 'green'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = 'white'
    ctx.font = '50px Arial'
    ctx.fillText(score, box * 2.5, box * 1.7 )

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX === food.x && snakeY === food.y) {
        score++
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else snake.pop()

    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game)
        setModal()
    }

    if (dir === 'left') snakeX -= box
    if (dir === 'right') snakeX += box
    if (dir === 'up') snakeY -= box
    if (dir === 'down') snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)
}

const game = setInterval(drawGame, 100)