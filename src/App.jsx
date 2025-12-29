import { useState } from 'react'
import './styles.css'

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  const handleClick = (index) => {
    if (squares[index] || winner || isDraw) return;
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      {winner && <div className="status winner">Winner: {winner}</div>}
      {isDraw && <div className="status draw">Draw!</div>}
      {!winner && !isDraw && <div className="status">Current: {currentPlayer}</div>}
      
      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            className={`square ${value === 'X' ? 'x-square' : 'o-square'}`}
            onClick={() => handleClick(index)}
            disabled={winner || isDraw}
          >
            {value}
          </button>
        ))}
      </div>
      
      <button className="reset" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default App
