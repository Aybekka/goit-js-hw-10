import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      iziToast.error({ title: "Error", message: "Please choose a date in the future" });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const ms = userSelectedDate - Date.now();
    
    if (ms <= 0) {
      clearInterval(timerId);
      updateTimerUI(0, 0, 0, 0);
      return;
    }

    const time = convertMs(ms);
    updateTimerUI(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
let previousTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
function updateTimerUI(d, h, m, s) {
 
  handleAnimation(timerFields.days, d, previousTime.days);
  handleAnimation(timerFields.hours, h, previousTime.hours);
  handleAnimation(timerFields.minutes, m, previousTime.minutes);
  handleAnimation(timerFields.seconds, s, previousTime.seconds);

  timerFields.days.textContent = addLeadingZero(d);
  timerFields.hours.textContent = addLeadingZero(h);
  timerFields.minutes.textContent = addLeadingZero(m);
  timerFields.seconds.textContent = addLeadingZero(s);

  
  previousTime = { days: d, hours: h, minutes: m, seconds: s };

}
 //deneme amaçlı küçük bir animasyon!!!!
function handleAnimation(element, newValue, oldValue) {
  if (newValue !== oldValue) {
    element.style.transition = 'transform 0.1s ease'; 
    element.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }
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