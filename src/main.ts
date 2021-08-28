/**
 * - ボード
 *  - ボードを描画する
 *  - 任意位置のマークを取得する
 *  - 任意位置にマークを配置する
 *  - 配置可能なマーク一覧を取得する
 * - プレイヤー
 *  - コンピュータープレイヤー
 *    - 配置可能なマーク一覧を取得する
 *    - 任意位置にマークを配置する
 *  - ヒューマンプレイヤー
 *    - 配置可能なマーク一覧を取得する
 *    - 任意位置にマークを配置する
 * - 審判
 *  - 勝者を判定する
 * 
 */

import { Board } from './board';
import { Referee } from './referee';
import { Player } from './player';
import { ComputerPlayer } from './computer_player';

const rl = require('readline');

// while (true) {
//   const resultX = playerX.check();

//   if (resultX.length === 0) {
//     break;
//   }

//   const selectX = Math.floor(Math.random() * resultX.length);
//   playerX.move({x: resultX[selectX].x, y: resultX[selectX].y});

//  if (referee.judge(playerX.mark)) {
//   console.log('PlayerX is win.');
//   break;
//  }

//   const resultY = playerY.check();

//   if (resultY.length === 0) {
//     break;
//   }

//   const selectY = Math.floor(Math.random() * resultY.length);
//   playerY.move({x: resultY[selectY].x, y: resultY[selectY].y});

//   if (referee.judge(playerY.mark)) {
//     console.log('PlayerY is win.');
//     break;
//   }
// }

// 自動対戦
function simulate() {
  const board = new Board();
  const computerPlayerA = new ComputerPlayer(board, '⭕');
  const computerPlayerB = new ComputerPlayer(board, '❌');
  const referee = new Referee(board);

  board.draw();

  while (true) {
    computerPlayerA.select();
    console.log('ComputerPlayerA selects.');
    board.draw();

    if (referee.judge(computerPlayerA.mark)) {
      console.log('ComputerPlayerA wins.');
      break;
    }

    computerPlayerB.select();
    console.log('ComputerPlayerB selects.');
    board.draw();

    if (referee.judge(computerPlayerB.mark)) {
      console.log('ComputerPlayerB wins.');
      break;
    }
  }
}

// CPU対戦
async function playWithComputerPlayer() {
  const board = new Board();
  const playerX = new Player(board, '⭕');
  const playerY = new ComputerPlayer(board, '❌');
  const referee = new Referee(board);

  board.draw();

  while(true) {
    console.log('マーカーを置ける場所: ')
    console.log(playerX.check());
    const input = await question('マーカーを置く場所を選んでください (例 1,2): ');
    const [x, y] = input.split(',');
    playerX.move({x: Number(x), y: Number(y)});
    console.log('PlayerX selects.');
    board.draw();

    if (referee.judge(playerX.mark)) {
      console.log('PlayerX wins.');
      break;
    }

    playerY.select();
    console.log('PlayerY selects.');
    board.draw();

    if (referee.judge(playerY.mark)) {
      console.log('PlayerY wins.');
      break;
    }
  }
}

// simulate();
// playWithComputerPlayer();

(async () => {
  await playWithComputerPlayer();
})()

function question (question: string): Promise<string> {
  const readlineInterface = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer: string) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

