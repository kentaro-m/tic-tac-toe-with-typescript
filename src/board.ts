import { log } from './log'
import { Position, Mark } from './type'

export class Board {
  private _board: string[][]

  constructor() {
    this._board = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]
  }

  draw() {
    for (let x = 0; x < this._board.length; x++) {
      log('|');
      for (let y = 0; y < this._board[x].length; y++) {
        log(this._board[x][y]);
        log('|');
      }
      log('\n');
      log('----------');
      log('\n');
    }
  }

  check(): Position[] {
    const results = [];
    for (let y = 0; y < this._board.length; y++) {
      for (let x = 0; x < this._board[y].length; x++) {
        if (!(this._board[x][y] === '⭕' || this._board[x][y] === '❌')) {
          results.push({ x, y })
        }
      }
    }
    return results;
  }

  get({x, y}: Position): string {
    return this._board[x][y];
  }

  move(mark: Mark, {x, y}: Position) {
    this._board[y][x] = mark;
  }
}