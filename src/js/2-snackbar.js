import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = e.currentTarget.elements.delay.value;
  const option = e.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (option === "fulfilled") {
        resolve(delay);
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      }
      else {
        reject(delay);
        console.log(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
    });

    promise
        .then(ok => {
          displayToastGood(`✅ Fulfilled promise in ${delay}ms`);
        })
        .catch(error => {
          displayToast(`❌ Rejected promise in ${delay}ms`);
    });
    form.reset();
});

function displayToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

function displayToastGood(message) {
  iziToast.show({
    title: 'Ok',
    backgroundColor: 'green',
    message: message,
    position: 'topRight',
  });
}

