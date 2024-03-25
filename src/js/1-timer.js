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
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      displayToast('Please choose a date in the future');
      start.disabled = true;
    }
    else {
      start.disabled = false;
    }
  },
  onChange(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate >= new Date()) {
      start.disabled = false;
    }
    else {
      start.disabled = true;
    }
  }
};

const input = document.getElementById('datetime-picker');
const fp = flatpickr(input, options);
const start = document.querySelector('[data-start]');
const daysS = document.querySelector('[data-days]');
const hoursS = document.querySelector('[data-hours]');
const minutesS = document.querySelector('[data-minutes]');
const secondsS = document.querySelector('[data-seconds]');

let countdownInterval;

start.disabled = true;

start.addEventListener('click', () => {
  const userSelectedDate = fp.selectedDates[0];
  start.disabled = true;
  input.disabled = true;
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const currentTime = new Date().getTime();
    const countInterval = userSelectedDate - currentTime;
    if (countInterval <= 0) {
      clearInterval(countdownInterval);
      displayToastGood('Time is up!');
      input.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(countInterval);
    daysS.textContent = addLeadingZero(days);
    hoursS.textContent = addLeadingZero(hours);
    minutesS.textContent = addLeadingZero(minutes);
    secondsS.textContent = addLeadingZero(seconds);
  }
});

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
  iziToast.success({
    title: 'Congratulations',
    message: message,
    position: 'topRight',
  });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}