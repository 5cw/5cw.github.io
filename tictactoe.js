
//all the triplets of positions which make up a line
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
//draws are marked with
const draw_char = '/'

let turn = 'X'
//comp0 is a generator, which needs to be reset sometimes
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
                    if (board_changed || event.target.value == 'player') return
                    update_settings()
                    reset()
                }
            },
            {
                value: 'random',
                text: 'random',
                script: (event) => {
                    if (board_changed || event.target.value == 'player') return
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
        
    },
    {
        name: 'playero',
        legend: 'O played by',
        options: [
            {
                value: 'human',
                text: 'human'
            },
            {
                value: 'random',
                text: 'random'
            }
        ],
        
    },
    {
        name: 'delay',
        legend: 'computer delay',
        min: 0.0,
        max: 2.0,
        step: .01,
        default: 0.0,
        indicator: '{value}s'
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


const reset_btn = document.getElementById('reset')

//generate settings html
raw_settings.forEach(
    setting => {
        const field = document.createElement('fieldset')
        const legend = document.createElement('legend')
        legend.textContent = setting.legend
        field.appendChild(legend)
        //a couple settings are mutually exclusive, this auto disables whichever settings are marked
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
        if (setting.options)
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
        else {
            const label = document.createElement('label')
            const input = document.createElement('input')
            input.type = 'range'
            input.name = setting.name
            input.value = setting.default
            input.min = setting.min
            input.max = setting.max
            input.step = setting.step
            const indicator = document.createElement('span')
            indicator.textContent = setting.indicator.replace('{value}', setting.default)
            input.addEventListener('input', setting_change)
            input.addEventListener('input', (event) => {
                indicator.textContent = setting.indicator.replace('{value}', event.target.value)
            })
            label.append(input)
            label.append(indicator)
            field.append(label)
        }
        settings.insertBefore(field, reset_btn.parentElement)
    }
)
//object storing active settings at runtime
let settings_table = {}

/**
 * stores selected settings in settings_table. this is only done when there is not an active game, to ensure the user does not
 * change settings during gameplay
 */
function update_settings() {
    document.querySelectorAll('#settings input:checked, #settings input[type=range]').forEach((input) => settings_table[input.name] = input.value)
}
update_settings()


reset_btn.addEventListener('click', (event) => {
    update_settings()
    settings.classList.remove('active')
    reset()
})

const new_game = document.createElement('div')
new_game.id = 'new_game'
new_game.textContent = 'new game?'

new_game.addEventListener('click', (event) => {
    new_game.style.display = "none"
    reset()
})

board.classList.add('board')

//generate board
for (let i = 0; i < 9; i++) {
    const subboard = document.createElement('div')
    subboard.id = 'b' + i
    subboard.classList.add('subboard')
    subboard.classList.add('active')
    for(let j = 0; j < 9; j++) {
        const sq = document.createElement('div')
        sq.classList.add('square')
        sq.addEventListener('click', click_sq)
        sq.addEventListener('mouseenter', preview)
        sq.addEventListener('mouseleave', preview)
        sq.style.gridArea=`${Math.floor(j/3) + 1} / ${j%3 + 1}` //gridArea is specified so that an overlay of the winning player can be used
        
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

game.append(new_game)
new_game.style.display = "none" //only show new game on game over


let board_changed = false;

reset()

/**
 * handler for clicking a square
 */
function click_sq(event) {
    if (board.classList.contains('locked')) return
    const [_, brd, sq] = [...this.id]
    make_move(brd, sq)
}

/**
 * updates board with a given move location
 * @param {string | number} brd subboard number
 * @param {string | number} sq square number
 */
function make_move(brd, sq) {
    if (!board_changed) {
        update_settings()
    }
    board.classList.remove('locked')
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
        if (win && windex > -1) {
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
        new_game.style.display = "block"
    } else {
        turn = turn == 'X' ? 'O' : 'X'
        turn_elem.textContent = turn + "'s turn"
        
        auto_move(turn == 'X' ? settings_table.playerx : settings_table.playero)
    }
}


/**
 * handler for computer move
 * @param {string} setting type of player whose turn it is 
 */
function auto_move(setting) {
    let move
    switch (setting) {
        case 'comp0':
            move = comp0.next().value
            break;
        case 'random':
            move = rand()
            break;
    }
    if (move) {
        if (settings_table.delay > 0){
            board.classList.add('locked')
            setTimeout(make_move, settings_table.delay * 1000, ...move)
        } else {
            make_move(...move)
        }
    }
}

/**
 * handler for showing and hiding a preview of the move the player would make when mousing over a square
 * @param {*} event mouseenter or mouseleave event 
 */
function preview(event) {
    if (!this.classList.contains('active') || board.classList.contains('locked')) return;
    this.textContent = event.type == 'mouseenter' ? turn : " "
}

/**
 * handler for a setting being changed. makes visible text clarifying the user must reset for the changes to take effect.
 */
function setting_change(_) {
    if (!board_changed) return
    document.getElementById('reminder').classList.add('active')
}

/**
 * activates subboard at position i
 * @param {number} i position of subboard 
 * @returns 
 */
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

/**
 * deactivates all subboards and squares
 */
function deactivate () {
    for(const element of document.querySelectorAll('.subboard, .square') ){
        element.classList.remove('active')
    }
}

/**
 * checks if a given board/subboard has a win or a draw
 * @param {array} arr list of squares in the board/subboard to check 
 * @returns {[string, number]} [winning player's character/draw character/empty string, line number or -1 if no win or draw]
 */
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

/**
 * creates line element drawn through winning line
 * @param {number} i line number (index into list of possible lines) 
 * @returns line html element
 */
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

/**
 * reset game to beginning
 */
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

    comp0 = comp0gen()
    auto_move(settings_table.playerx)
}

/**
 * generator for perfect moves
 * @yields [board number, square number]
 */
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

/**
 * function for random valid moves
 * @returns [board number, square number]
 */
function rand() {
    const options = document.querySelectorAll('.square.active')
    const choice = options[Math.floor(Math.random() * options.length)]
    return [choice.id[1], choice.id[2]]
}