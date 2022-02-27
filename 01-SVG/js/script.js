function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
    
}

function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
}

if (document.getElementById(".rect2").fill = 'red') {
    document.getElementById(".rect2").fill = 'blue';
}
else {
    document.getElementById(".rect2").fill = 'red';
}



