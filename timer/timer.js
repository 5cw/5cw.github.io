let value = 3 * 60;
let full = 3 * 60;
let fps = 20;
let tickID;
let second = 1000
let newsec = second
let running = false;
const time = document.getElementById('visuals')
const m = document.getElementById('minutes')
const s = document.getElementById('seconds')


const palettes = {
    mic: [
        [-30, 'veryover'],
        [0, 'over'],
        [15, 'close'],
        [60, 'tint']
    ],
    subtler: [
        [-60, 'over'],
        [0, 'close'],
        [60, 'tint']
    ],
    subtlest: [
        [-60, 'close'],
        [0, 'tint'],
    ],
    none: []
}
const paletteEl = document.getElementById('palette');
let palette = palettes[paletteEl.value] || []

paletteEl.addEventListener('input', ev => {
    palette = palettes[ev.target.value]
})
const negative = document.getElementById('negative')
const overflow = document.getElementById('overflow')

let goNegative;
let doOverflow;

const updateN = (ev) => {
    goNegative = negative.checked;
    if (goNegative) {
        overflow.classList.remove('readonly')
    } else {
        overflow.classList.add('readonly')
        overflow.checked = false
        doOverflow = false
    }
}

const updateO = (ev) => {
    doOverflow = overflow.checked;
}

updateN()
updateO()

negative.addEventListener('input', updateN)
overflow.addEventListener('input', updateO)

function update() {
    let v = Math.abs(value)

    m.textContent = (value < 0 ? '-' : '' ) + Math.floor(v / 60) 
    s.textContent = String(v % 60).padStart(2, '0')
    time.className = ''
    for (const [t, setting] of palette) {
        if (value <= t) {
            time.className = setting;
            break;
        }
    }
    let completed = (full - value) / full * 100
    document.getElementById('progress').style.width = Math.min(completed, doOverflow ? 102 : 100) + '%'
    document.getElementById('overprogress').style.width = Math.max(completed - 102, 0) + '%'
}

function tickDown() {
    value -= 1;
    if (!goNegative && value < 0) {
        value = 0;
    }
    if (newsec != second) {
        clearInterval(tickID)
        tickID = setInterval(tickDown, newsec)
        second = newsec
    }
    update()
}

function stop() {
    running = false
    time.classList.add('paused')
}
stop()
function start() {
    running = true
    time.classList.remove('paused')
}

function reset(val = undefined) {
    if (val != undefined) {
        value = val
        full = val
        update()
        stop()
    }
    clearInterval(tickID)
    tickID = undefined;
    time.className = ''
    
}

function updateSecond(val) {
    newsec = val;
    document.getElementById('readout').textContent = '1s = ' + Math.floor(newsec) + 'ms'
}



addEventListener('keydown', (event) => {
    if (event.key == 's' || event.key == 'r') {
        reset(3 * 60)
    } else if (event.key >= '0' && event.key <= '9')  {
        reset(parseInt(event.key) * 60)
    } else if (event.key == 'ArrowDown') 
        value -= 30;
     else if (event.key == 'ArrowUp') 
        value += 30;
     else if (event.key == 'ArrowLeft') 
        value += 5;
     else if (event.key == 'ArrowRight') 
        value -= 5;
     else if (event.key == '_' || event.key == '-') {
        updateSecond(newsec  + 100)
     } else if (event.key == '+' || event.key == '=') {
        updateSecond(newsec - 100)
     } else if (event.key == 'n'){
        updateSecond(1000)
     } else if (event.key == 'h'){
        document.getElementById('help').classList.toggle('hidden')
     } 
     if (value > full) {
        full = value
     }
    if (event.key == 's' || event.key == ' ') {
        reset()
        if (!running) {
            tickID = setInterval(tickDown, second)
            start()

        } else {
            stop()
        }
        
    }
    update()


})

addEventListener('keyup', (event) => {
    if (event.key == 'q' ) {
        document.getElementById('panel').classList.add('hidden')
        
    }


})