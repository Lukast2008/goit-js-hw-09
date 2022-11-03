import Notiflix from 'notiflix';

const handleButtonSub = document.querySelector('form');
let delayValue = 0;
let stepValue = 0;
let amountValue = 0;

function createPromise({ position, stepValue }) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, stepValue });
      } else {
        reject({ position, stepValue });
      }
    }, delayValue);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  delayValue = Number(delay.value);
  stepValue = Number(step.value);

  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, stepValue)
      .then(({ position, delay }) => {
        Notiflix.Report.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Report.info(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    stepValue += Number(step.value);
  }
}

handleButtonSub.addEventListener('submit', onSubmit);
