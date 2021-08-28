import { Player } from './player'

export class ComputerPlayer extends Player {
  select() {
    const choices = this._board.check();
    if (choices.length > 0) {
      const choice = Math.floor(Math.random() * choices.length);
      this.move({x: choices[choice].x, y: choices[choice].y});
    }
  }
}