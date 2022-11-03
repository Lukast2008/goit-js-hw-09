import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > new Date(selectedDates[0])) {
      // window.alert('Please choose a date in the future');
      Notiflix.Report.info('Please choose a date in the future');
    }
  },
});

const handelInputTimeValue = document.querySelector('#datetime-picker');
const handelButtonControlTimer = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');

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

const timer = {
  intervalId: null,

  start(rootSelector, deadline) {
    this.intervalId = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        this.stop();
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(diff);

      rootSelector.querySelector('[data-days]').textContent = this.pad(days);
      rootSelector.querySelector('[data-hours]').textContent = this.pad(hours);
      rootSelector.querySelector('[data-minutes]').textContent =
        this.pad(minutes);
      rootSelector.querySelector('[ data-seconds]').textContent =
        this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return `${value}`.padStart(2, 0);
  },
};

handelButtonControlTimer.addEventListener('click', () => {
  timer.start(timerEl, searchDateInInput);
  handelButtonControlTimer.setAttribute('disabled', true);
});
