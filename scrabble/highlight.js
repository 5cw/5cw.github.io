let clicks = []
let lanes = []
const times = [0, .1, .2, .3, .4, .5, .7, 1., 1.4, 1.9, 2.5, 3.5]
const shuffle = document.querySelector('.shuffle');

counts = {   'A': 9,
    'B': 2,
    'C': 2,
    'D': 4,
    'E': 12,
    'F': 2,
    'G': 3,
    'H': 2,
    'I': 9,
    'J': 1,
    'K': 1,
    'L': 4,
    'M': 2,
    'N': 6,
    'O': 8,
    'P': 2,
    'Q': 1,
    'R': 6,
    'S': 4,
    'T': 6,
    'U': 4,
    'V': 2,
    'W': 2,
    'X': 1,
    'Y': 2,
    'Z': 1,
    '?': 2}
points = {   'A': 1,
    'B': 3,
    'C': 3,
    'D': 2,
    'E': 1,
    'F': 4,
    'G': 2,
    'H': 4,
    'I': 1,
    'J': 8,
    'K': 5,
    'L': 1,
    'M': 3,
    'N': 1,
    'O': 1,
    'P': 3,
    'Q': 10,
    'R': 1,
    'S': 1,
    'T': 1,
    'U': 1,
    'V': 4,
    'W': 4,
    'X': 8,
    'Y': 4,
    'Z': 10,
    '?': 0}
let beginning = undefined;
let history = []
/*def get_available(self):
        av = counts.copy()
        for word, lane in self.history:
            for letter in word:
                av[letter] -= 1
        return av

    def add_word(self, word, lane):
        self.history.append((word, lane))

    def undo(self):
        self.history.pop()

    def is_valid(self, x, y):
        for word, lane in self.history:
            print(lane, ord(lane) - 64, x, y)
            if lane.isdigit() and y == int(lane) or x == ord(lane) - 64:
                return False
        return True*/
function get_available() {
    let av = structuredClone(counts)
    for (const word of history) {
        for (const letter of word) {
            av[letter] -= 1
        }
    }
    return av
}


function update_inputs() {
    const inputs = document.querySelector('.input')
    const shuffle = document.querySelector('.shuffle')
    if (document.querySelector('.active')) {
        inputs.classList.remove('hidden')
        shuffle.classList.add('hidden')
        const textbox = document.querySelector('input')
        textbox.focus()
        textbox.select()
    } else {
        inputs.classList.add('hidden')
        shuffle.classList.remove('hidden')
    }
}
function update_squares(setting, pid) {
    const avoid = pid[0] + pid.match(/\d+/g)[0]
    for (const square of document.querySelectorAll('.start, .selected')) {
        square.classList.remove('start', 'selected')
    }
     for (const square of document.querySelectorAll('.square')) {
            if (setting == 'active' || setting == 'shuffling') {
                if (!square.classList.contains(avoid)) {
                    square.classList.add('dark')
                } else {
                    square.classList.remove('dark')
                    if (setting == 'active') {
                        square.classList.add('start')
                        if (!document.querySelector('.selected')) {
                            square.classList.add('selected')
                            beginning = square
                        }
                    }
                }
            } else {
                square.classList.remove('dark')
            }
    }

}

for (const square of document.querySelectorAll('.square') ){
    square.addEventListener('click', event => {
        if (event.target.classList.contains('start')) {
            for (const selected of document.querySelectorAll('.selected')) {
                selected.classList.remove('selected')
            }
            beginning = event.target
            event.target.classList.add('selected')
        }
    })
}
const context = new AudioContext()
function beep(duration, frequency, volume, type) {
    let oscillator = context.createOscillator();
    let gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    console.log('noise')
    if (volume){gainNode.gain.value = volume;}
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + ((duration || 500) / 1000));
}

for (const label of document.querySelectorAll('.label')) {
    const pid = label.id.split('-')[1];
    const pel = document.getElementById(pid);
    lanes.push(pel)
    //console.log('e')
    const clickfn = function (final) {
       // console.log(this)
        if (this == "shuffle") {
            for (const shuffling of document.querySelectorAll('.shuffling')) {
                shuffling.classList.remove('shuffling')
            }
            pel.classList.add('shuffling')
            update_squares('shuffling', pid)

            beep(50, 300, .1, 'square')
            if (final) {
                setTimeout(() => {
                    pel.classList.remove("shuffling")
                    pel.classList.add("active")
                    update_inputs()
                    update_squares('active', pid)
                    beep(100, 500, .1, 'square')
                }, 1500)
            }
        } else if (pel.classList.contains('done')) {
            pel.classList.remove('done');
            beep(50, 300, .04, 'square')
        } else if (pel.classList.contains('active')) {
            pel.classList.remove('active')
            beep(50, 300, .04, 'square')
            pel.classList.add('done')
            update_squares('done', pid)
        } else if (!document.querySelector('.active')) {
            pel.classList.add('active')
            beep(50, 300, .04, 'square')
            update_squares('active', pid)
        }
        update_inputs()
    };
    label.addEventListener('click', clickfn)
    clicks.push(clickfn)
}

shuffle.addEventListener('click', event => {
    for (const el of document.querySelectorAll('.report, .points')) {
        el.textContent = '';
    }
    for (let i = 0; i < 12; i++) {
        let index = -1;
        while (index < 0 || lanes[index].classList.contains('done') || lanes[index].classList.contains('active')) {
            index = Math.floor(Math.random() * clicks.length);
            //console.log(index)
        }

        setTimeout(clicks[index].bind("shuffle", i === 11), 1000 * times[i])
    }
})

function report(msg, pts) {
    beep(200, pts ? 500 : 200, .1, 'square')

    document.querySelector('.report').textContent = msg;
    document.querySelector('.points').textContent = pts + ' points';
}

function withBlanks(word) {
    let av = get_available()
    let bword = '';
    for (const char of word.toUpperCase()) {
        if (av[char] > 0) {
            av[char] -= 1
            bword += char
        } else if (av['?'] > 0) {
            av['?'] -= 1
            bword += '?'
        } else {
            report("Sorry, there aren't enough " + char + "'s left in the bag", 0)
            return undefined
        }
    }
    return bword
}

function submitWord() {
    const input = document.querySelector('input')

    const lane = document.querySelector('.active')
    lane.classList.remove('active')
    lane.classList.add('done')
    update_squares('done', lane.id)
    update_inputs()
    const word = withBlanks(input.value)
    input.value = ''
    if (word === undefined) {
        return
    }
    let x, y, dx, dy;
    for (const cls of beginning.classList) {
        if (cls[0] == 'c') {
            x = parseInt(cls.slice(1))
        } else if (cls[0] == 'r') {
            y = parseInt(cls.slice(1))
        }
    }
    if (lane.id[0] == 'r') {
        dx = 1;
        dy = 0;
        if (x + word.length > 16) {
            report("Word too long, goes off edge of board.", 0)
            return
        }
        for (const column of document.querySelectorAll('.done.column')) {
            const idx = parseInt(column.id.slice(6))
            if (idx >= x && idx < x + word.length) {
                report('Word too long, crosses column ' + String.fromCharCode(64 + idx), 0)
                return
            }
        }
    } else {
        dx = 0;
        dy = 1;
        if (y + word.length > 16) {
            report("Word too long, went off edge of board", 0)
            return
        }
        for (const row of document.querySelectorAll('.done.row')) {
            //console.log(row,)
            const idx = parseInt(row.id.slice(3))
            if (idx >= y && idx < y + word.length) {
                report('Word too long, crossed row ' + idx, 0)
                return
            }
        }
    }
    console.log(x, y)
    let mw = 1;
    let total = word.length >= 7 ? 50 : 0;
    for (const char of word) {
        const sq = document.querySelector('.r' + y + '.c' + x)
        let mult = 1;
        if (sq.classList.contains('TL')) {
            mult = 3
        } else if (sq.classList.contains('DL')) {
            mult = 2
        } else if (sq.classList.contains('TW')) {
            mw *= 3
        } else if (sq.classList.contains('DW')) {
            mw *= 2
        }
        total += points[char] * mult
        y += dy;
        x += dx;
    }
    console.log('reached')
    report(word.length >= 7 ? 'Bingo!' : 'Great word!', total * mw)
    history.push(word)
}
document.querySelector('.choose').addEventListener('click', submitWord)
document.addEventListener('keypress', event => {
    if (event.key == 'Enter')
        submitWord()
})