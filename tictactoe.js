

const game = document.getElementById('game')

const board = document.createElement('div')

board.classList.add('board')

let squares = []
let boards = []
let btxts = []

for (let i = 0; i < 9; i++) {
    const subboard = document.createElement('div')
    subboard.id = i
    subboard.classList.add('subboard')
    subboard.classList.add('active')
    for(let j = 0; j < 9; j++) {
        const sq = document.createElement('div')
        sq.classList.add('square')
        sq.classList.add('active')
        sq.addEventListener('click', fill)
        sq.style.gridArea=`${Math.floor(j/3) + 1} / ${j%3 + 1}`
        sq.textContent = ' '
        sq.id = `${i}.${j}`
        subboard.appendChild(sq)
        squares.push(sq)
    }
    const subtext = document.createElement('div')
    subtext.classList.add('over')
    subboard.append(subtext)
    //subtext.textContent = "X"
    board.append(subboard)
    boards.push(subboard)
    btxts.push(subtext)
}
game.append(board)

const turn_elem = document.getElementById('turn')

let turn = 'X'

const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function fill(event) {
    console.log(event)
    if (!this.classList.contains('active')) return;
    this.textContent = turn;
    const [brd, sq] = this.id.split('.')
    const brdno = parseInt(brd)
    const brdidx = brdno * 9
    const boardtxt = btxts[brdno]
    if (boardtxt.textContent == "") {
        const [win, windex] = checkwin(squares, brdidx)
        boardtxt.textContent = win
        if (win) {
            boards[brdno].append(drawline(windex))
        }
    }   
    deactivate()
    
    if (!activate_board(parseInt(sq))) {
        for (let i = 0; i < 9; i++) {
            activate_board(i)
        }
    }
    const [win, windex] = checkwin(btxts)
    if (win) {
        turn_elem.textContent = win + " wins!"
        board.append(drawline(windex, 3.25))
        deactivate()
    } else {
        turn = turn == 'X' ? 'O' : 'X'
        turn_elem.textContent = turn + "'s turn"
    }
}

function activate_board(i) {
    const board = boards[i]
    console.log(board)
    let active = 0;
    for (const sq of [...board.childNodes].slice(0,-1)) {
        if (sq.textContent == " ") {
            sq.classList.add('active')
            active ++
        }
    }
    if (active) {
        board.classList.add('active')
    }
    return active > 0
}

function deactivate () {
    for(const element of boards ){
        element.classList.remove('active')
    }
    for(const element of squares ){
        element.classList.remove('active')
    }
}

function checkwin(arr, offset=0) {
    
        for (const [i, line] of lines.entries()) {
            const [a,b,c] = line.map(i => arr[offset + i].textContent)
            
            if (a == b && b == c && a != " ") {
                console.log(a,b,c)
                return [a, i]
            }
        }
    
    return ["", -1]
}

function drawline(i, scale=1) {
    const line = document.createElement('div')
    line.classList.add('line')
    line.style.width = (i < 6 ? 8 : 10) * scale + "em"
    const vy = 3.7
    const x = [0,0,0,-2.8,0,2.8,-1,-1][i] * scale
    const y = (scale > 1 ? .5 : 0) + [1,3.6,6.3,vy,vy,vy,vy,vy][i] * scale
    const angle = [0,0,0,90,90,90,45,-45][i]
    line.style.transform = `translate(${x}em,${y}em) rotate(${angle}deg)`
    console.log(line.style.transform)
    return line
}