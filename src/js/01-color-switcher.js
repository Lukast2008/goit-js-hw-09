function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyColorChange = document.querySelector('body');
let buttClick = null;

startBtn.addEventListener('click', () => {
  buttClick = setInterval(() => {
    bodyColorChange.style.background = getRandomHexColor();
  }, 500);
  startBtn.setAttribute('disabled', true);
});

stopBtn.addEventListener('click', () => {
  clearInterval(buttClick);
  startBtn.removeAttribute('disabled');
});
