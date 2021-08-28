import { Position, Mark } from './type';
import { Board } from './board';

export class Player {
  protected _board: Board;
  protected _mark: Mark;

  constructor(board: Board, mark: Mark) {
    this._board = board;
    this._mark = mark;
  }

  get mark() {
    return this._mark;
  }

  check() {
    return this._board.check();
  }

  move({x, y}: Position) {
    console.log({x, y});
    this._board.move(this._mark, {x, y});
  }
}
