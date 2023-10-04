
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

const draw_char = '/'

let turn = 'X'

let comp0

const raw_settings = [
    {
        name: 'draw',
        legend: 'draws',
        options: [
            {
                value: 'allow',
                text: 'allow draws'
            },
            {
                value: 'tiebreak',
                text: 'tiebreak draws if 5 squares filled'
            }
        ]
    },
    {
        name: 'won',
        legend: 'play on won boards',
        options: [
            {
                value: 'true',
                text: 'allow',
            },
            {
                value: 'false',
                text: "don't allow",
            }
        ]
    },
    {
        name: 'playerx',
        legend: 'X played by',
        options: [
            {
                value: 'human',
                text: 'human'
            },
            {
                value: 'comp0',
                text: 'perfect computer',
                script: (event) => {
                    if (board_changed || event.target.value != 'comp0') return
                    update_settings()
                    reset()
                }
            }
        ],
        exclusions: [
            {
                value: 'comp0',
                setting: 'won',
                disallowed: 'false',
                default: 'true',
                hover: "perfect computer strategy doesn't work in the variant where won boards are unplayable"
            }
        ],
        
    }
]

const game = document.getElementById('game')
const turn_elem = document.getElementById('turn')

const board = document.createElement('div')

const settings = document.getElementById('settings')
const settings_btn = document.getElementById('setbtn')
settings_btn.addEventListener('click', (event) => {
    settings.classList.toggle('active')
    settings_btn.classList.toggle('active')
})


const update = document.getElementById('reset')

raw_settings.forEach(
    setting => {
        const field = document.createElement('fieldset')
        const legend = document.createElement('legend')
        legend.textContent = setting.legend
        field.appendChild(legend)
        const exclude = setting.exclusions ? (event) => {
                for (const exclusion of setting.exclusions){
                    const disable = event.returnValue && event.target.value == exclusion.value
                    const ele = document.querySelector(`input[name=${exclusion.setting}][value=${exclusion.disallowed}]`)
                    ele.disabled = disable
                    ele.parentElement.style.opacity = disable ? .5 : 1
                    ele.parentElement.title = disable ? exclusion.hover : ''
                    if (ele.checked && disable) {
                        document.querySelector(`input[name=${exclusion.setting}][value=${exclusion.default}]`).checked = true
                    }
                }
            } : null
        
        setting.options.forEach(
            (option, i) => {
                const label = document.createElement('label')
                const input = document.createElement('input')
                input.type = 'radio'
                input.name = setting.name
                input.value = option.value
                if (i < 1) {
                    input.checked = true
                }
                input.addEventListener('input', setting_change)
                if (setting.exclusions) {
                    input.addEventListener('input', exclude)
                }
                if (option.script) {
                    input.addEventListener('input', option.script)
                }
                label.append(input)
                label.append(option.text)
                field.append(label)
            }
        )
        settings.insertBefore(field, update.parentElement)
    }
)

let settings_table = {}

function update_settings() {
    document.querySelectorAll('#settings input:checked').forEach((input) => settings_table[input.name] = input.value)
}
update_settings()


update.addEventListener('click', (event) => {
    update_settings()
    settings.classList.remove('active')
    reset()
})

const reset_btn = document.createElement('div')
reset_btn.id = 'btn'
reset_btn.textContent = 'new game?'

reset_btn.addEventListener('click', (event) => {
    reset_btn.style.display = "none"
    reset()
})

board.classList.add('board')


for (let i = 0; i < 9; i++) {
    const subboard = document.createElement('div')
    subboard.id = 'b' + i
    subboard.classList.add('subboard')
    subboard.classList.add('active')
    for(let j = 0; j < 9; j++) {
        const sq = document.createElement('div')
        sq.classList.add('square')
        sq.addEventListener('click', fill)
        sq.addEventListener('mouseenter', show)
        sq.addEventListener('mouseleave', hide)
        sq.style.gridArea=`${Math.floor(j/3) + 1} / ${j%3 + 1}`
        
        sq.id = `s${i}${j}`
        subboard.appendChild(sq)
    }
    const subtext = document.createElement('div')
    subtext.classList.add('over')
    subboard.append(subtext)
    //subboard.append(drawline(i%8))
    //board.append(drawline(i%8))
    //subtext.textContent = Math.random() < .5 ? "" : "X" 
    board.append(subboard)
}
game.append(board)

game.append(reset_btn)
reset_btn.style.display = "none"

let board_changed = false;

reset()


function fill(event) {
    const [_, brd, sq] = [...this.id]
    make_move(brd, sq)
}

function make_move(brd, sq) {
    if (!board_changed) {
        update_settings()
    }
    const targetsq = document.getElementById(`s${brd}${sq}`)
    if (!targetsq.classList.contains('active')) {
        console.log('invalid move!')
        return
    }
    targetsq.textContent = turn
    board_changed = true
    const brdno = "#b" + brd
    const boardtxt = document.querySelector(brdno + " .over")
    if (boardtxt.textContent == "") {
        const [win, windex] = checkwin(document.querySelectorAll(brdno + " .square"))
        boardtxt.textContent = win
        if (win && windex > 0) {
            document.querySelector(brdno).append(drawline(windex))
        }
    }   
    deactivate()
    
    if (!activate_board(parseInt(sq))) {
        for (let i = 0; i < 9; i++) {
            activate_board(i)
        }
    }
    const [win, windex] = checkwin(document.querySelectorAll('.over'))
    if (win) {
        if (windex > -1) {
            turn_elem.textContent = win + " wins!"
            board.append(drawline(windex))
        } else {
            turn_elem.textContent = "draw."
        }
        deactivate()
        reset_btn.style.display = "block"
    } else {
        turn = turn == 'X' ? 'O' : 'X'
        turn_elem.textContent = turn + "'s turn"
        if (turn == 'X') 
        switch (settings_table.playerx) {
            case 'comp0':
                make_move(...comp0.next().value)
                break;
        }
    }
    
    
}

function show(event) {
    if (!this.classList.contains('active')) return;
    this.textContent = turn
}

function hide(event) {
    if (!this.classList.contains('active')) return;
    this.textContent = ' '
}

function setting_change(event) {
    if (!board_changed) return
    document.getElementById('reminder').classList.add('active')
}

function activate_board(i) {
    if (settings_table.won != 'true' && document.querySelector(`#b${i} .over`).textContent != "") {
        return false;
    }
    let active = 0;
    for (const sq of document.querySelectorAll(`#b${i} .square`)) {
        if (sq.textContent == " ") {
            sq.classList.add('active')
            active ++
        }
    }
    if (active) {
        document.querySelector("#b" + i).classList.add('active')
    }
    return active > 0
}

function deactivate () {
    for(const element of document.querySelectorAll('.subboard') ){
        element.classList.remove('active')
    }
    for(const element of document.querySelectorAll('.square') ){
        element.classList.remove('active')
    }
}

function checkwin(arr) {
    let draw = 0;
        for (const [i, line] of lines.entries()) {
            const all = line.map(i => arr[i].textContent)
            const [a,b,c] = all
            if (all.includes(draw_char) || (all.includes('X') && all.includes('O'))) {
                draw ++
            }
            if (a == b && b == c && a != " ") {
                return [a, i]
            }
        }
    if (settings_table.draw == 'tiebreak') {
        for(const player of ['X', 'O'])
        if ([...arr].filter(sq => sq.textContent == player).length > 4) return [player, -1]
    }
    else if (draw > 7) return [draw_char, -1]
    return ["", -1]
}

function drawline(i) {
    const line = document.createElement('div')
    line.classList.add('line')
    
    line.style.width = (i < 6 ? 95 : 130) + "%"
    const offset = 35
    line.style.left = 50 + [0,0,0,-offset,0,offset,0,0][i] + "%"
    line.style.top = 50 + [-offset,0,offset,0,0,0,0,0][i] + "%"
    
    const angle = [0,0,0,90,90,90,45,-45][i]
    line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
    return line
}

function reset() {
    for (const sq of document.querySelectorAll(".square")) {
        sq.classList.add('active')
        sq.textContent = ' '
    }
    document.querySelectorAll(".over").forEach(btxt => btxt.textContent = "")
    document.querySelectorAll(".subboard").forEach(board => board.classList.add('active'))
    document.querySelectorAll(".line").forEach(line => line.remove())
    turn = 'X'
    turn_elem.textContent = "X's turn"

    document.getElementById('reminder').classList.remove('active')
    board_changed = false;
    switch (settings_table.playerx) {
        case 'comp0':
            comp0 = comp0gen()
            make_move(...comp0.next().value)
            break;
    }
}

function* comp0gen() {
    yield [4, 4]
    for (let i = 0; i<7; i++ ) {
        yield [document.querySelector('.subboard.active').id[1], 4]
    }
    const last = document.querySelector('.subboard.active').id[1]
    const opposite = 8 - last
    yield [last, last]
    for (let i = 0; i<16; i++) {
        const brd = (document.querySelector(`#b${opposite}.active`) ?? document.querySelector('.subboard.active')).id[1]
        const sq = document.querySelector(`#s${brd}${last}.active`) ? last : opposite
        yield [brd, sq]
    }
}
