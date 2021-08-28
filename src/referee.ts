import { Board } from './board'
import { Mark } from './type'

export class Referee {
  private _board: Board;

  constructor(board: Board) {
    this._board = board;
  }

  judge(mark: Mark): Boolean {
    const winCombos = [
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
      [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
      [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
      [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
      [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
      [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
      [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
      [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}],
    ]

    let isWin = false;

    for (let i = 0; i < winCombos.length; i++) {
      const results = [];
      for (let j = 0; j < winCombos[i].length; j++) {
        if (this._board.get({x: winCombos[i][j].x, y: winCombos[i][j].y}) === mark) {
          results.push(true);
        }
      }
      
      if (results.length === 3) {
        isWin = true;
      }
    }

    return isWin;
  }
}
