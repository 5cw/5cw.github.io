
const defaults = {
    rank: {
        name: 'rank',
        values: [
            {
                "symbol": "A",
                "name": "Ace",
                "index": 1,
                "alt-indices": [14]
            },
            {
                "index": 2
            },
            {
                "index": 3
            },
            {
                "index": 4
            },
            {
                "index": 5
            },
            {
                "index": 6
            },
            {
                "index": 7
            },
            {
                "index": 8
            },
            {
                "index": 9
            },
            {
                "index": 10
            },
            {
                "symbol": "J",
                "name": "Jack",
                "index": 11,
                "face": "🫅"
            },
            {
                "symbol": "Q",
                "name": "Queen",
                "index": 12,
                'face': '👸'
            },
            {
                "symbol": "K",
                "name": "King",
                "index": 13,
                "face": '🤴'
            }
        ],
    },
    coin: {
        values: [
            {
                'symbol': 'H',
                name: "Heads"
            },
            {
                'symbol': 'T',
                name: "Tails"
            }
        ]
    },
    suit: {
        values: [
            {
                "symbol": "♠",
                "name": "Spades",
                "color": "black"
            },
            {
                "symbol": "♣",
                "name": "Clubs",
                "color": "black"
            },
            {
                "symbol": "♥",
                "name": "Hearts",
                "color": "red"
            },
            {
                "symbol": "♦",
                "name": "Diamonds",
                "color": "red"
            },
        ]
    },
}
for (let i = 14; i < 0; i++) {
    defaults.rank.values.push(
        {
            'index': [i]
        }
    )
}

const rules = {
    'high': {
        type: 'default',
        rank: 0,
        name: "High Card",
        print: '$rank High',
    },
    'pair': {
        type: 'count',
        count: [2],
        dimensions: ['rank'],
        rank: 1,
        name: 'Pair',
        print: 'Pair of $ranks'

    },
    'n of a kind': {
        type: 'count',
        count: [3,4,5,6,7],
        dimensions: ['rank'],
        rank: 1,
        name: '$count of a Kind',
        print: '$count $ranks'
    },
    'full house': {
        type: 'compound-count',
        count: [3, 2],
        name: 'Full House',
        print: '$rank0s over $rank1s'
    },
    'straight': {
        type: 'run',
        count: [5],
        dimensions: ['rank'],
        name: 'Straight',
        print: '$rank0-$rank4 Straight'
    },
    'flush': {
        type: 'count',
        count: [5],
        dimensions: ['suit'],
        name: 'Flush',
        print: '$suit Flush'
    },
    'royal flush': {

    }
}

const dimensions = [
    defaults.rank,
    defaults.suit,
]
const a = document.querySelector('.download')
const file = new Blob([JSON.stringify(dimensions, null, 1)], { type: 'application/json' });
const url = URL.createObjectURL(file);
a.setAttribute('href', url)
a.setAttribute('download', 'cards.json');

let cards = [[]]
for (const dimension of dimensions) {
    let n_cards = []
    for (const value of dimension.values) {
        for (const card of cards) {
            let n_card = card.slice()
            n_card.push(value)
            n_cards.push(n_card)
        }
    }
    cards = n_cards
}
const card_deck = document.querySelector('.card-deck')

function evenly_spaced(p1, p2, n) {

    if (n == 1)
        return [(p1 + p2) / 2]
    let step = (p2 - p1) / (n - 1)
    let out = []
    for (let i = 0; i < n; i++) {
        out.push(p1 + i * step)
    }
    return out
}

function balanced_subset(slots, rem) {
    let mid_half = Math.floor(slots.length / 2)
    let rem_half = Math.floor(rem / 2)
    if (slots.length % 2 == 0) {
        return slots.slice(mid_half - rem_half - rem % 2, mid_half + rem_half)
    } else {
        if (rem % 2 == 0) {
            return [...slots.slice(mid_half - rem_half, mid_half), ...slots.slice(mid_half + 1, mid_half + rem_half + 1)]
        } else {
            return slots.slice(mid_half - rem_half, mid_half + rem_half + 1)
        }
    }
}

function pip_positions(i) {
    if (i < 4) {
        return [i < 2 ? 3 : 1.5, evenly_spaced(-1, 1, i).map(n => [0, n])]
    } else if (i < 18) {
        let mid_height = Math.floor(i / 3) + (i == 8 ? 1 : 0) // bicycle deck uses two strips of four for 8
        let height = mid_height + 1
        let sides = evenly_spaced(-1, 1, height).map(n => [[-1, n], [1, n]]).flat()

        let offset = (sides[2][1] - sides[0][1]) / 2
        let slots = evenly_spaced(-1 + offset, 1 - offset, mid_height).map(n => [0, n])
        let rem = i % height
        return [height < 5 ? 1.5 : 1, [...sides, ...balanced_subset(slots, rem)]]
    } else {
        let height = i < 29 ? 6 : Math.ceil((i + 2) / 5)
        let mid_height = height - 1
        let sides = evenly_spaced(-1, 1, height).map(n => [[-1, n], [0, n], [1, n]]).flat()
        let offset = (sides[3][1] - sides[0][1]) / 2
        let slots = evenly_spaced(-1 + offset, 1 - offset, mid_height)
        let lslots = slots.map(n => [-.5, n])
        let rslots = slots.map(n => [.5, n])
        let rem = i - 3 * height
        let rem_half = Math.floor(rem / 2)
        return [.93 ** height * 1.3, [...sides, ...balanced_subset(lslots, rem_half + rem % 2), ...balanced_subset(rslots, rem_half)]]
    }

}

function toggleHand(event) {
    const parent = this.parentElement
    this.remove()
    if (parent.classList.contains('card-deck')) {
        document.querySelector('.active-hand').append(this)
    } else {
        document.querySelector('.card-deck').append(this)
    }
    updateEvaluation()
}

function updateEvaluation() {
    console.log(document.querySelector('.active-hand').children)
}


if (dimensions.length) {
    for (const card of cards) {
        let card_display = document.createElement('div')
        card_display.classList.add('card')
        let display = []
        let num_pips = 0
        let face = undefined
        let fullname = []
        for (const component of card) {
            display.push(component.symbol || component.index)
            if (component.color) {
                card_display.style.color = component.color
            }
            if (component.index) {
                num_pips = component.index
            }
            if (component.face) {
                face = component.face
            }
            fullname.push(component.name || component.symbol || component.index)
        }
        let scale
        let pips
        if (face) {
            let pip_el = document.createElement('div')
            pip_el.classList.add('pip')
            pip_el.textContent = face
            pip_el.style.transform = `translate(-50%,-50%) scale(2.5)`
            pip_el.style.top = '50%'
            pip_el.style.left = '50%'
            card_display.append(pip_el)
        }
        [scale, pips] = face ? [1.5, [[-1, 1], [1, -1]]] : pip_positions(num_pips)
       
        for (const pip of pips) {
            let pip_el = document.createElement('div')
            pip_el.classList.add('pip')
            pip_el.textContent = display[display.length - 1]
            pip_el.style.transform = `translate(-50%,-50%) scale(${scale}) rotate(${pip[1] > 0 ? 180 : 0}deg)`
            pip_el.style.top = (pip[1] * 25 + 50) + '%'
            pip_el.style.left = (pip[0] * 20 + 50) + '%'
            card_display.append(pip_el)
        }
        let text = document.createElement('div')
        let rtext = document.createElement('div')
        let name_display = document.createElement('div')
        text.classList.add('card-text')
        rtext.classList.add('rcard-text')
        name_display.classList.add('card-name')
        const display_text = display.join('<br>')
        text.innerHTML = display_text
        rtext.innerHTML = display_text
        name_display.textContent = fullname.join(' of ')
        card_display.append(text, rtext, name_display)
        card_display.addEventListener('click', toggleHand)
        card_deck.appendChild(card_display)
    }
}