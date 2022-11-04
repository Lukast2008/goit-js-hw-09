import Notiflix from 'notiflix';

const handleButtonSub = document.querySelector('form');
let delayValue = 0;
let stepValue = 0;
let amountValue = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delayValue);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  delayValue = Number(delay.value); // затримка
  stepValue = Number(step.value); // крок
  amountValue = Number(amount.value); //цикл

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
}

handleButtonSub.addEventListener('submit', onSubmit);
