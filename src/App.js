import { useState } from "react";
import Board from "./components/Board";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);

		const squaresEl = document.querySelectorAll('.square');
		squaresEl.forEach(el => {
			if (el.classList.contains('winner')) {
				el.classList.remove('winner');
			}
		});
		document.getElementById('status').classList.remove('winner');
		document.getElementById('status').classList.remove('dead-heat');
	}

	const moves = history.map((squares, move) => {
		let description;
		if (currentMove === move) {
			return (
				<li key={move} className="curMove">You are at move # {move}</li>
			);
		} else if (move > 0) {
			description = 'Go to move # ' + move;
		} else {
			description = 'Go to game start';
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<>
			<h1>Tic-Tac-Toe Game</h1>
			<div className="game">
				<div className="game-board">
					<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
				</div>
				<div className="game-info">
					<div className="historyTitle">History your moving</div>
					<ol>{moves}</ol>
				</div>
			</div>
		</>
	);
}
