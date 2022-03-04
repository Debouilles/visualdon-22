<<<<<<< HEAD
=======
const rectangles = document.querySelectorAll('.rectangle')

rectangles.forEach(rectangle => {
    rectangle.addEventListener('click', evt => {
        evt = evt.target;
        console.log(evt);
        rectangle.classList.toggle('change')
    })
})


domOn('.circle1', 'mousemove', async evt => {
    const btn = evt.currentTarget;
    if (btn.style.r === '60') {
        btn.style.r = '100';
    }
    else btn.style.r = '60';
});

>>>>>>> f14f980e1882a5e8658f860f70bc5557f0025603

function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
}
