const body = document.querySelector("body")
const IMG_NUM = 3;

function paintImage(imageNum) {
    const image = new Image();
    image.src = `./images/${imageNum+1}.jpg`
    image.classList.add("bgImage")
    body.appendChild(image)
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUM)
    paintImage(number);
}

function init() {
    const randomNumber = genRandom();
}

init();