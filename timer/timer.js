let value = 3 * 60;
let full = 3 * 60;
let fps = 20;
let tickID;
let lastsec;
let running = false;
const time = document.getElementById('visuals')
const m = document.getElementById('minutes')
const s = document.getElementById('seconds')


const pallettes = {
    mic: [
        [-30, 'veryover'],
        [0, 'over'],
        [30, 'close'],
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

const urlParams = new URLSearchParams(window.location.search)
const pallette = pallettes[urlParams.get('pallette') || 'none'] || []




function update() {
    let v = Math.abs(value)

    m.textContent = (value < 0 ? '-' : '' ) + Math.floor(v / 60) 
    s.textContent = String(v % 60).padStart(2, '0')
    for (const [t, setting] of pallette) {
        if (value < t) {
            time.className = setting;
            break;
        }
    }
    let completed = (full - value) / full * 100
    document.getElementById('progress').style.width = (completed < 102 ? completed : 102) + '%'
    document.getElementById('overprogress').style.width = (completed > 102 ? completed - 102 : 0) + '%'
}

function tickDown() {
    value -= 1;
    update()
    lastsec = Date.now()
}

function reset(val = undefined) {
    if (val != undefined) {
        value = val
        full = val
        update()
        running = false
    }
    clearInterval(tickID)
    tickID = undefined;
    time.className = ''
    
}




let second = 1000

function syncSecond(nsecond) {
    second = nsecond
    document.getElementById('readout').textContent = '1s = ' + Math.floor(second) + 'ms'
    if (running) {
        setTimeout(() => {
            clearInterval(tickID)
            tickID = setInterval(tickDown, second)
        }, lastsec + 1000 - Date.now())
    }
    
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
        syncSecond(second / .95)
     } else if (event.key == '+' || event.key == '=') {
        syncSecond(second  * .95)
     } else if (event.key == 'n'){
        syncSecond(1000)
     } else if (event.key == 'h'){
        document.getElementById('help').classList.toggle('hidden')
     } else if (event.key == 'q' ) {
        document.getElementById('panel').classList.remove('hidden')
        
    }
    if (event.key == 's' || event.key == ' ') {
        reset()
        if (!running) {
            tickID = setInterval(tickDown, second)
            running = true
        } else {
            running = false
        }
        
    }
    update()


})

addEventListener('keyup', (event) => {
    if (event.key == 'q' ) {
        document.getElementById('panel').classList.add('hidden')
        
    }


})