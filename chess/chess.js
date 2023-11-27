const board = document.querySelector('.board')
const update = document.getElementById('update')

for (let i = 0; i<64; i++) {
    const d = document.createElement('div')
    d.classList.add('square', (i+Math.floor(i/8))%2 ? 'white-sq' : 'black-sq', 'sq'+i, 'pos_'+String.fromCharCode(104-Math.floor(i/8))+(i%8+1))
    if (i%8<1) {
        const letter = document.createElement('div')
        letter.classList.add('letter')
        letter.textContent = String.fromCharCode(104-Math.floor(i/8))
        d.append(letter)
    }
    if (i>55) {
        const number = document.createElement('div')
        number.classList.add('number')
        number.textContent = i-55
        d.append(number)
    }
    board.append(d)
}

const editor = ace.edit('editor')
 {
    const contents = ace.EditSession.fromJSON(window.localStorage.getItem('editor'))
    contents.setUndoManager(new ace.UndoManager())
    if (contents) {
        editor.setSession(contents)
    }
}  
editor.session.setUseWrapMode(true)

editor.session.on('change', () => {
    window.localStorage.setItem('editor', JSON.stringify(editor.getSession().toJSON()))
})

const runUpdate = () => {
    const obj = {}
    for (const match of editor.getValue().matchAll(/^\s*(.+)\s*:\s*"(.+)"\s*$/gm)) {
        obj[match[1]]=match[2]
    }
    if (obj.FEN) {
        l=0
        for (const line of obj.FEN.split('/')) {
            i=0
            for (const char of line) {
                const num = Number(char)
                if (isNaN(num)){
                    const img = document.createElement('img')
                    img.classList.add('piece',char)
                    img.src = obj.default.replace('$p',char.toLowerCase()).replace('$s',char == char.toLowerCase() ? 'd' : 'l')
                    document.querySelector('.sq'+(l*8+i)).append(img)
                }
                i+=num||1
            }
            l+=1
        }
    }
    console.log(obj)
}

update.addEventListener('click', runUpdate) 

runUpdate()