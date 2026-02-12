import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;
  const toastOptions = {
    position: 'topRight',
    transitionIn: 'flipInX',
    transitionOut: 'fadeOut',
    closeOnClick: true,
  };
  createPromise(delay, state)
    .then((d) => {
      iziToast.success({ ...toastOptions, title:'Success', message: `✅ Fulfilled promise in ${d}ms` });
    })
    .catch((d) => {
      iziToast.error({ ...toastOptions, title:'Error',message: `❌ Rejected promise in ${d}ms` });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}