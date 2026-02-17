const boardElement = document.getElementById("sudoku-board");
const solveBtn = document.getElementById("solve-btn");
const resetBtn = document.getElementById("reset-btn");
const speedSlider = document.getElementById("speed");
const themeBtn = document.getElementById("theme-toggle");

const cells = [];
let delay = 150;
let stopSolving = false;


for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 9;
  input.classList.add("cell");

  input.addEventListener("input", () => {
    if (input.value < 1 || input.value > 9) {
      input.value = "";
      return;
    }
    // live validation
    isBoardValid(getBoard());
  });

  cells.push(input);
  boardElement.appendChild(input);
}

// /* ---------- THEME TOGGLE ---------- */
// themeBtn.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   themeBtn.textContent =
//     document.body.classList.contains("dark")
//       ? "🌞 Light Mode"
//       : "🌙 Dark Mode";
// });


themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent =
    document.body.classList.contains("dark")
      ? "🌙 Dark Mode"
      : "🌞 Light Mode"; 
});


speedSlider.addEventListener("input", () => {
  delay = 300 - speedSlider.value * 3;
});


const sleep = ms => new Promise(res => setTimeout(res, ms));

function toggleInputs(state) {
  cells.forEach(cell => (cell.disabled = state));
}


function getBoard() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  cells.forEach((cell, i) => {
    const r = Math.floor(i / 9);
    const c = i % 9;
    board[r][c] = cell.value ? Number(cell.value) : 0;
  });
  return board;
}

function updateCell(r, c, val, cls) {
  const idx = r * 9 + c;


  if (cells[idx].classList.contains("given")) return;

  cells[idx].value = val === 0 ? "" : val;
  cells[idx].classList.add(cls, "solved");

  setTimeout(() => {
    cells[idx].classList.remove(cls);
  }, delay);
}

function resetBoard() {
  cells.forEach(cell => {
    cell.value = "";
    cell.disabled = false;
    cell.classList.remove(
      "active",
      "backtrack",
      "error",
      "given",
      "solved"
    );
  });
}


function isBoardValid(board) {
  let valid = true;
  cells.forEach(c => c.classList.remove("error"));

  const mark = idx => {
    cells[idx].classList.add("error");
    valid = false;
  };

  // Row & Column check
  for (let i = 0; i < 9; i++) {
    const rMap = {};
    const cMap = {};

    for (let j = 0; j < 9; j++) {
      if (board[i][j]) {
        if (rMap[board[i][j]] !== undefined) {
          mark(i * 9 + j);
          mark(i * 9 + rMap[board[i][j]]);
        }
        rMap[board[i][j]] = j;
      }

      if (board[j][i]) {
        if (cMap[board[j][i]] !== undefined) {
          mark(j * 9 + i);
          mark(cMap[board[j][i]] * 9 + i);
        }
        cMap[board[j][i]] = j;
      }
    }
  }

  // 3x3 box check
  for (let br = 0; br < 9; br += 3) {
    for (let bc = 0; bc < 9; bc += 3) {
      const box = {};
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const val = board[br + r][bc + c];
          const idx = (br + r) * 9 + (bc + c);
          if (val) {
            if (box[val] !== undefined) {
              mark(idx);
              mark(box[val]);
            }
            box[val] = idx;
          }
        }
      }
    }
  }

  return valid;
}


function isValid(board, r, c, num) {
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === num || board[i][c] === num) return false;
  }

  const sr = Math.floor(r / 3) * 3;
  const sc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[sr + i][sc + j] === num) return false;

  return true;
}

function findEmpty(board) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (board[i][j] === 0) return [i, j];
  return null;
}


async function solveSudoku(board) {
  if (stopSolving) return false;

  const empty = findEmpty(board);
  if (!empty) return true;

  const [r, c] = empty;

  for (let num = 1; num <= 9; num++) {
    if (stopSolving) return false;

    if (isValid(board, r, c, num)) {
      board[r][c] = num;
      updateCell(r, c, num, "active");
      await sleep(delay);

      if (await solveSudoku(board)) return true;

      board[r][c] = 0;
      updateCell(r, c, 0, "backtrack");
      await sleep(delay);
    }
  }
  return false;
}

solveBtn.addEventListener("click", async () => {
  const board = getBoard();

  if (!isBoardValid(board)) {
    alert("❌ Fix highlighted cells before solving.");
    return;
  }

  stopSolving = false;
  toggleInputs(true);
  solveBtn.disabled = true;


  cells.forEach(cell => {
    if (cell.value !== "") cell.classList.add("given");
  });

  await solveSudoku(board);

  toggleInputs(false);
  solveBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
  stopSolving = true;
  resetBoard();
});

