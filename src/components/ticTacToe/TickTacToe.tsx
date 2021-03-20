import React, { useState } from 'react';

export default function TickTacToe() {

    const [player, setPlayer] = useState(1);
    const [game, setGame] = useState(new Array(3).fill(new Array(3).fill('A')));
    console.log(game);
  
    const tdClick = (e: any) => {
      const td = e.target;
      const id = e.target.id;
      const x = parseInt(id.split('-')[0]);
      const y = parseInt(id.split('-')[1]);
      const position = game[x][y];
      game[x][y] = player === 1 ? 'X' : 'O';
      setGame(game);
  
      setPlayer(player === 1 ? 2 : 1);
    }

    const trs = [0, 1, 2].map((tr: any) => <tr key={tr} id={tr}>{[0, 1, 2].map(td => <td key={tr + '-' + td} id={tr + '-' + td} onClick={tdClick}>{game[td]}</td>)}</tr>);
  
    return (
      <div className="ticTacToe">
        <table>
          <body>
            {trs}
          </body>
        </table>
      </div>
    );
  }
