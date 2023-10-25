const display = document.getElementById('display');
function clearDisplay() {
  display.value = '';
}

function appendToDisplay(value) {
  display.value += value;
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (err) {
    display.value = 'Error';
  }
}
