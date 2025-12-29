# Sudoku Backtracking Visualizer

An interactive **Sudoku Solver Visualizer** built using **Vanilla JavaScript** to demonstrate how the **backtracking (DFS) algorithm** works step by step.

The project focuses on **visual learning**, showing trial placements, backtracking, and constraint checking in real time.

---

## 🚀 Live Demo
👉 https://sudoku-backtracking.netlify.app

---

## 🎯 Purpose of the Project

- To visualize how the **backtracking algorithm** solves Sudoku
- To make recursion and DFS easier to understand
- To provide an interactive learning tool rather than just a solver
- To validate user input and prevent invalid Sudoku configurations

---

## 🧠 How It Works

- Finds an empty cell in the grid
- Tries numbers from **1 to 9**
- Checks validity based on:
  - Row
  - Column
  - 3×3 sub-grid
- Places a number if valid and moves forward
- If no valid number fits:
  - Removes the number (backtracks)
  - Tries the next possibility
- Continues until the puzzle is solved or no solution exists

Each step is visualized with animation.

---

## 🧩 What This Tells Us

- Sudoku is a **constraint satisfaction problem**
- Depth-First Search explores one solution path at a time
- Wrong early decisions lead to dead ends
- Backtracking is essential to undo incorrect choices
- Visualization helps understand recursion flow clearly

---

## 🛠️ Technologies Used

- **HTML** – Structure
- **CSS** – Styling, animations, dark/light mode, 3×3 box separation
- **JavaScript (Vanilla JS)** – Solver logic, validation, visualization

### JavaScript Concepts
- Recursion
- Backtracking (DFS)
- Async / Await (for visualization)
- DOM manipulation
- Event handling
- State control

No frameworks or libraries were used.

---

## ✨ Features

- Step-by-step backtracking visualization
- Speed control slider
- Light / Dark mode
- Real-time input validation
- Conflict highlighting (row, column, 3×3 box)
- User-input numbers styled differently from solver-filled numbers
- Reset button that safely terminates solving
- Clear 3×3 box separation for better usability

---

## ⏱️ Performance Note

- The visualizer intentionally runs slower due to animation delays
- Without visualization (pure DFS), the same algorithm solves puzzles in milliseconds
- This trade-off is intentional for learning and clarity

