import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    countInterval = userSelectedDate - this.defaultDate;

    if (userSelectedDate < new Date()) {
      displayToast('Please choose a date in the future');
      start.disabled = true;
    }
    else {
      start.disabled = false;
      input.disabled = true;
    }

    if (start.disabled === true) {
      start.classList.toggle('btn');
    }
    else if (start.disabled === false) {
      start.classList.toggle('disabled');
    }
  },
};

const input = document.getElementById('datetime-picker');
const fp = flatpickr(input, options);
const start = document.querySelector('[data-start]');
const daysS = document.querySelector('[data-days]');
const hoursS = document.querySelector('[data-hours]');
const minutesS = document.querySelector('[data-minutes]');
const secondsS = document.querySelector('[data-seconds]');

let userSelectedDate;
let countInterval;

start.disabled = true;

const dateSelect = () => {
  const period = setInterval(updateTimer, 1000);

  if (!userSelectedDate) return;
  start.disabled = true;
  input.disabled = true;

  function updateTimer() {
    const currentTime = new Date().getTime();
    countInterval = userSelectedDate - currentTime;
    // updateTimer.preventDefault();
    input.disabled = true;

    if (countInterval < 1) {
      start.disabled = true;
      input.disabled = false;
      clearInterval(period);
      displayToastGood('Time is up!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(countInterval);
    daysS.textContent = addLeadingZero(days);
    hoursS.textContent = addLeadingZero(hours);
    minutesS.textContent = addLeadingZero(minutes);
    secondsS.textContent = addLeadingZero(seconds);
  }
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function displayToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

function displayToastGood(message) {
  iziToast.show({
    title: 'Congratulations',
    backgroundColor: 'green',
    message: message,
    position: 'topRight',
  });
}

function convertMs(ms) {
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
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

start.addEventListener('click', dateSelect);