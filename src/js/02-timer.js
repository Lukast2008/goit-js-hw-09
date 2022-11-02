import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > new Date(selectedDates[0])) {
      window.alert('Please choose a date in the future');
    }
  },
});

const handelInputTimeValue = document.querySelector('#datetime-picker');
const handelButtonControlTimer = document.querySelector('[data-start]');

handelButtonControlTimer.setAttribute('disabled', true);

let searchDateInInput = null;
const dateNow = Date.now();

handelInputTimeValue.addEventListener('change', () => {
  searchDateInInput = new Date(handelInputTimeValue.value);

  if (searchDateInInput > dateNow) {
    handelButtonControlTimer.removeAttribute('disabled');
  } else {
    handelButtonControlTimer.setAttribute('disabled', true);
  }
});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const timer = {
  intervalId: null,

  start(rootSelector, deadline) {
    this.intervalId = setInterval(() => {
      const now = new Date();
      const diff = searchDateInInput - now;

      const { days, hours, minutes, seconds } = this.getTimeComponents(diff);

      rootSelector.querySelector('[data-days]').textContent = this.pad(days);
      rootSelector.querySelector('[data-hours] ').textContent = this.pad(hours);
      rootSelector.querySelector('[data-minutes]').textContent =
        this.pad(minutes);
      rootSelector.querySelector('[ data-seconds]').textContent =
        this.pad(seconds);

      rootSelector.querySelector('[data-days]').dataset.title =
        this.declensionNum(days, ['день', 'дня', 'днів']);
      rootSelector.querySelector('[data-hours] ').dataset.title =
        this.declensionNum(hours, ['година', 'години', 'годин']);
      rootSelector.querySelector('[data-minutes]').dataset.title =
        this.declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
      rootSelector.querySelector('[ data-seconds]').dataset.title =
        this.declensionNum(seconds, ['секунда', 'секунди', 'секунд']);
    }, 1000);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  },
};
