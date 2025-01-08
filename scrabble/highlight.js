
for (const label of document.querySelectorAll('.label')) {
    //console.log('e')
    label.addEventListener('click', event => {
        let pid = label.id.split('-')[1];
        let pel = document.getElementById(pid);
        if (pel.classList.contains('done')) {
            pel.classList.remove('done');
        } else if (pel.classList.contains('active')) {
            pel.classList.remove('active')
            for (const square of document.querySelectorAll('.dark')) {

                square.classList.remove('dark')
            }
            pel.classList.add('done')
        } else {
            pel.classList.add('active')
            const avoid = pid[0] + pid.match(/\d+/g)[0]
            for (const square of document.querySelectorAll('.square')) {
                if (!square.classList.contains(avoid)) {
                    square.classList.add('dark')
                }
            }
        }
    })
}