import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice()
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	function calculateWinner(squares) {
		const statusEl = document.getElementById('status');
		const squaresEl = document.querySelectorAll('.square');

		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				statusEl.classList.add('winner');
				squaresEl.forEach((el, idx) => {
					if (idx === a || idx === b || idx === c) {
						el.classList.add('winner');
					}
				});
				return 'Winner: ' + squares[a];
			}
		}
		if (!squares.includes(null)) {
			statusEl.classList.add('dead-heat');
			return 'Dead heat';
		} else {
			return null;
		}
	}

	return (
		<>
			<div id="status" className="status">{status}</div>
			<div className="squaresBlock">
				<div className="board-row">
					<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
					<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
					<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
				</div>
				<div className="board-row">
					<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
					<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
					<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
				</div>
				<div className="board-row">
					<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
					<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
					<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
				</div>
			</div>
		</>
	);
}
