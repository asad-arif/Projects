let currentPlayer = 'X';
const divs = document.querySelectorAll('.mydiv');
let result = document.querySelectorAll('.resut')[0];

divs.forEach((div) => {
  div.addEventListener('click', () => {
    if (!div.textContent) {
      div.textContent = currentPlayer;
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }
    style();
    checkWinner();
  });
});

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let draw = true;

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      divs[a].textContent &&
      divs[a].textContent === divs[b].textContent &&
      divs[a].textContent === divs[c].textContent
    ) {
      result.textContent = `${divs[a].textContent} wins!`;
      result.style.display = 'block';
      clear();
      reload();
      return;
    }
  }
  //draw condition
  for (const div of divs) {
    if (!div.textContent) {
      draw = false;
      break;
    }
  }
  //Print Draw
  if (draw) {
    result.textContent = "It's a draw!";
    result.style.display = 'block';
    clear();
  }
  //out
}

function clear() {
  divs.forEach((div) => {
    div.textContent = '';
    div.style.backgroundColor = '';
  });
}
function resetGame() {
  let r = confirm('Are you sure to Reset Game?');
  if (r) {
    clear();
  }
  result.style.display = 'none';
  currentPlayer = 'X';
}
function hide() {
  result.style.display = 'none';
}

function style() {
  divs.forEach((div) => {
    if (div.textContent === 'O') {
      div.style.backgroundColor = '#ffaf42';
      div.style.color = 'white';
    }
  });
}

function reload() {
  setTimeout(() => {
    window.location.reload(true);
  }, 2000);
}
