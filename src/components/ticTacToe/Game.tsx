import React, { useState } from 'react';
import Board from './Board';

import './Game.css';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: [], selected: false }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [buttonBold, setButtonBold] = useState(false);

    const handleChangeBoard = (i: any, location: any, e: any) => {
        var target = e.currentTarget;
        var parent = target.parentElement;
        var child = target.children[0];
        
        console.log('location', location);
        const h = history.slice(0, stepNumber + 1);
        const current = h[h.length - 1];
        const sqrs = current.squares.slice();
        const selected = current.selected;
        if (calculateWinner(sqrs) || sqrs[i]) {
            return;
        }
        sqrs[i] = xIsNext ? 'X' : 'O';
        if(xIsNext) {
            child.innerHTML = 'games';
        } else {
            child.innerHTML = 'fiber_manual_record';
        }

        setHistory(h.concat([{ squares: sqrs, location: location, selected: false }]));
        setXIsNext(!xIsNext);
        setStepNumber(h.length);
    }

    const calculateWinner = (squares: any[]) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    const jumpTo = (move: number) => {
        setStepNumber(move);
        setXIsNext((move % 2) === 0);
        const current: any = history.find((s, i) => i === move);
        current.selected = !current.selected;
        let copyHistory = history.slice();
        copyHistory = copyHistory.map(s => {
            return {
                squares: s.squares,
                location: s.location,
                selected: false
            }
        });
        copyHistory = copyHistory.map((s, i) => i === move ? current : s);
        setHistory(copyHistory);
    }

    const h = history;
    const current = h[stepNumber];
    const winner = calculateWinner(current.squares);
    console.log('history', h);

    const moves = h.map((step, move) => {
        const loc = `[${step.location.join(',')}]`
        const desc = move ?
        `Go to move # ${move} - loc: ${loc}` :
        `Go to game start`;

        return (
            <li key={move}>
                <button style={{ fontWeight: step.selected ? 'bold' : 'normal' }} onClick={(event) => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }    
    
    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onChangeBoard={(i: any, location: any, e: any) => handleChangeBoard(i, location, e)}>
                </Board>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;
