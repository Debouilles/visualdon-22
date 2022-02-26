var turns = 0;

function dot_01() {
    if (turns === 0) {
        turns++;
        document.getElementById(".rect2").style.color = 'red';
     } else if (turns === 1) {
        turns--;
        document.getElementById(".rect2").style.color = 'blue';
    }
}