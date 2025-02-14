function cell(type, scope, colspan, rowspan) {
    let el = document.createElement(type)
    if (scope)
        el.setAttribute("scope", scope);
    if (colspan) 
        el.setAttribute("colspan", colspan);
    if (rowspan) 
        el.setAttribute("rowspan", rowspan);
    return el
}

let calendar = document.getElementById('calendar')
const prefixes = ["Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "Sun", "End"]
const letterIDs = [..."MTWRFSNE"]
let head = document.createElement('thead')
let tbody = document.createElement('tbody')
calendar.append(head, tbody)
let today = document.getElementById('today')

head.append(cell('th', 'col', '1'))
for (let i = 0; i<8; i++) {
    if (i < 7) {
        head.append(cell('th', 'col'))
        let month = cell('th', 'col', '7')
        month.textContent = prefixes[i] + 'month'
        head.append(month)
    }
    let row = cell('tr')
    tbody.append(row)
    let week = cell('th', 'row')
    week.textContent = prefixes[i] + 'week'
    row.append(week)
    if (i == 7) {
        row.append(cell('td', undefined, '9'))
    }
    for (let j = (i == 7 ? 1 : 0); j < 7; j++) {
        if (i==0) {
            row.append(cell('td', undefined, undefined, j < 2 ? 7 : 8))
        }
        for (let k = 0; k < 7; k++) {
            let day = cell('td')
            day.textContent = letterIDs[k]
            if (j < 4 && i == 7) 
                day.classList.add('dotted')
            row.append(day)
        }
    }
}

