import React, { useState } from "react";

/**
 * Main Container for TicTacToe Classic.
 * Provides two-player gameplay, win/draw detection, status, and restart control.
 * Layout: centered 3x3 grid, status above, restart below. Light, modern style.
 */

// Colors as per requirements
const COLORS = {
  background: "#ffffff",
  fg: "#222222",
  accent: "#2196f3",
  border: "#e0e0e0"
};

// List of winning line indices (rows, cols, diags)
const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/** Returns the winner symbol 'X' or 'O' and the winning line, or null if no winner */
function calculateWinner(squares) {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: LINES[i] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Board state: 9 cells, each '', 'X', or 'O'.
   * xIsNext: true if 'X' to move, false for 'O'
   */
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = calculateWinner(squares);
  const isBoardFull = squares.every((sq) => sq);
  const isDraw = !winnerInfo && isBoardFull;

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    // Do nothing if game over or cell taken
    if (squares[idx] || winnerInfo) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(""));
    setXIsNext(true);
  }

  // Status message
  let status;
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div style={containerStyle}>
      <div style={statusStyle}>{status}</div>
      <Board
        squares={squares}
        onCellClick={handleClick}
        winningLine={winnerInfo ? winnerInfo.line : []}
      />
      <button style={restartStyle} onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

// Board Component
function Board({ squares, onCellClick, winningLine }) {
  return (
    <div style={boardStyle}>
      {squares.map((val, i) => (
        <Cell
          key={i}
          value={val}
          onClick={() => onCellClick(i)}
          highlight={winningLine && winningLine.includes(i)}
        />
      ))}
    </div>
  );
}

// Cell Component
function Cell({ value, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...cellStyle,
        color: value === "X" ? COLORS.accent : COLORS.fg,
        borderColor: highlight ? COLORS.accent : COLORS.border,
        backgroundColor: highlight
          ? "#e3f2fd"
          : COLORS.background,
      }}
      aria-label="TicTacToe cell"
    >
      {value}
    </button>
  );
}

// --- Inline Styles (matches requirements, keeps layout centered and modern) ---

const containerStyle = {
  background: COLORS.background,
  color: COLORS.fg,
  borderRadius: 10,
  boxShadow: "0 4px 24px rgba(34,34,34,0.09)",
  maxWidth: 340,
  margin: "60px auto",
  padding: "32px 24px 24px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: 420,
};

const statusStyle = {
  marginBottom: 28,
  fontSize: 20,
  fontWeight: 500,
  letterSpacing: 1,
  minHeight: 30,
};

const boardStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 64px)",
  gridTemplateRows: "repeat(3, 64px)",
  gap: 0,
  background: COLORS.fg,
  borderRadius: 8,
  boxShadow: "0 2px 10px rgba(34,34,34,0.04)",
};

const cellStyle = {
  width: 64,
  height: 64,
  fontSize: 36,
  fontWeight: "600",
  background: COLORS.background,
  border: `2px solid ${COLORS.border}`,
  outline: "none",
  cursor: "pointer",
  transition: "all 0.13s",
  borderRadius: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  userSelect: "none",
};

const restartStyle = {
  marginTop: 32,
  padding: "10px 24px",
  color: "#fff",
  background: COLORS.accent,
  border: "none",
  borderRadius: 4,
  fontSize: 16,
  fontWeight: 500,
  cursor: "pointer",
  transition: "background 0.17s",
};

// PUBLIC_INTERFACE
export default TicTacToeClassic;
