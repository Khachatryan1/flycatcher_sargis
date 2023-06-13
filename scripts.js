const hitSound = new Audio('multimedia/flycatcher_sound.mp3');
const flySound = new Audio('multimedia/flaying_sound.mp3');

const flyImage = document.getElementById('fly-image');
const container = document.getElementById('wrapper');
const cursorImage = document.getElementById('cursor-image');

const blodImage = 'multimedia/blod.png';
const originalImageSrc = flyImage.src;

const imageWidth = flyImage.offsetWidth;
const imageHeight = flyImage.offsetHeight;

const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

const cursorImageWidth = cursorImage.offsetWidth;
const cursorImageHeight = cursorImage.offsetHeight;

const maxX = containerWidth - imageWidth;
const maxY = containerHeight - imageHeight;

const maxLeft = containerWidth - cursorImageWidth;
const maxTop = containerHeight - cursorImageHeight;

let isMoving = true;


moveImage();

function getRandomPosition(maxX, maxY) {
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    return { x: randomX, y: randomY };
}

function moveImage() {
    if (!isMoving) {
        return;
    } 

    const position = getRandomPosition(maxX, maxY);
    flySound.play();

    flyImage.style.top = position.y + 'px';
    flyImage.style.left = position.x + 'px';

    setTimeout(moveImage, 1000);
}

function createNewMark() {
    const newImage = document.createElement('img');
    newImage.className = 'bloody-mark';
    newImage.src = blodImage;
    newImage.style.left = flyImage.style.left;
    newImage.style.top = flyImage.style.top;
    container.appendChild(newImage);
}

container.addEventListener('click', () => {
    hitSound.play();
});

container.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const left = Math.min(mouseX - cursorImageWidth / 2, maxLeft - 150);
    const top = Math.min(mouseY - cursorImageHeight / 2, maxTop - 70);

    cursorImage.style.display = 'block';
    cursorImage.style.left = left + 'px';
    cursorImage.style.top = top + 'px';
});

cursorImage.addEventListener('click', () => {
    const cursorLeft = cursorImage.offsetLeft;
    const cursorTop = cursorImage.offsetTop;
    const imageLeft = flyImage.offsetLeft;
    const imageTop = flyImage.offsetTop;

    const distanceX = Math.abs(cursorLeft - imageLeft);
    const distanceY = Math.abs(cursorTop - imageTop);

    if (distanceX < 100 && distanceY < 100) {
        isMoving = false;
        flyImage.src = blodImage;

        setTimeout(() => {
            isMoving = true;
            flyImage.src = originalImageSrc;
            createNewMark();
            moveImage();
        }, 3000);
    }
});

