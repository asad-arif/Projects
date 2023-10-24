const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let moves = 0;

function makeMove(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    cell.style.pointerEvents = 'none';
    moves++;
    if (checkWinner(currentPlayer)) {
      message.textContent = `Player ${currentPlayer} wins!`;
      board.style.pointerEvents = 'none';
    } else if (moves === 9) {
      message.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent === player &&
      cells[b].textContent === player &&
      cells[c].textContent === player
    ) {
      cells[a].style.backgroundColor = 'green';
      cells[b].style.backgroundColor = 'green';
      cells[c].style.backgroundColor = 'green';
      return true;
    }
  }
  return false;
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.style.pointerEvents = 'auto';
    cell.style.backgroundColor = '#eee';
  });
  currentPlayer = 'X';
  message.textContent = "Player X's turn";
  board.style.pointerEvents = 'auto';
  moves = 0;
}

resetButton.addEventListener('click', resetGame);
