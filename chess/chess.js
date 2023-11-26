const board = document.querySelector('.board')
for (let i = 0; i<64; i++) {
    const d = document.createElement('div')
    d.classList.add((i+Math.floor(i/8))%2 ? 'white-sq' : 'black-sq')
    board.append(d)
}

const editor = ace.edit('editor')
 {
    const contents = ace.EditSession.fromJSON(window.localStorage.getItem('editor'))
    if (contents) {
        editor.setSession(contents)
    }
}  
editor.setOptions({
    showGutter: false,
    showLineNumbers: true,
})

editor.session.on('change', () => {
    window.localStorage.setItem('editor', JSON.stringify(editor.getSession().toJSON()))
})