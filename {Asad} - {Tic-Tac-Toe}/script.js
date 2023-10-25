let currentPlayer = 'X';
const divs = document.querySelectorAll('.mydiv');

divs.forEach((div) => {
  div.addEventListener('click', () => {
    if (!div.textContent) {
      div.textContent = currentPlayer;
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }
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

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      divs[a].textContent &&
      divs[a].textContent === divs[b].textContent &&
      divs[a].textContent === divs[c].textContent
    ) {
      alert(`${divs[a].textContent} wins!`);
      clearBoard();
    }
  }
}

function clear() {
  divs.forEach((div) => {
    div.textContent = '';
  });
}
function resetGame() {
  let r = confirm('Are you sure to Reset Game?');
  if (r) {
    clear();
  }
  currentPlayer = 'X';
}
