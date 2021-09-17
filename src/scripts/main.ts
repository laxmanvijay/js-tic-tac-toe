import { ElArr, States } from './constants';
import { checkWinner, createEl } from './utils';

const winnerContainer = <HTMLElement>document.getElementsByClassName('winner-container')[0];
const board = <HTMLElement>document.getElementsByClassName('board')[0];
const winnerEl = document.getElementById('winner');
const toggleButton = document.getElementById('togglePlayerMode');

let isComputerMode = false;

let outArr = [['NA', 'NA', 'NA'], ['NA', 'NA', 'NA'], ['NA', 'NA', 'NA']];
let turn: 'X'|'O' = 'X';
const arr = Array.from(document.getElementsByClassName('cell'));

Element.prototype.removeAllChildren = function () {
  while (this.lastChild) {
    this.lastChild.remove();
  }
};

const toggleListener = function () {
  isComputerMode = !isComputerMode;
  this.nextElementSibling!.innerHTML = isComputerMode ? 'Computer plays O' : '2 player mode';
};

const reset = () => {
  arr.forEach((el) => el.removeAllChildren());
  turn = States.X;
  board.style.zIndex = '1';
  board.style.pointerEvents = 'auto';
  outArr = [['NA', 'NA', 'NA'], ['NA', 'NA', 'NA'], ['NA', 'NA', 'NA']];
  toggleButton?.addEventListener('click', toggleListener);
  toggleButton!.style.display = 'block';
};

const autoFillNextPos = () => {
  const els: ElArr[] = [];
  arr.forEach((el, i) => {
    if (el.children.length < 1) {
      els.push({
        el, i,
      });
    }
  });
  if (els.length) {
    const randomPos = Math.floor(Math.random() * els.length);

    els[randomPos].el.appendChild(createEl(States.O));
    const row = Math.floor(els[randomPos].i / 3);
    const col = els[randomPos].i % 3;
    outArr[row][col] = States.O;
    turn = States.X;
  }
};

arr.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (el.children.length < 1) {
      toggleButton?.removeEventListener('click', toggleListener);
      toggleButton!.style.display = 'none';
      const row = Math.floor(i / 3);
      const col = i % 3;
      if (turn === States.X) {
        el.appendChild(createEl(turn));
        outArr[row][col] = turn;
        turn = States.O;
        if (isComputerMode) {
          autoFillNextPos();
        }
      } else if (!isComputerMode) {
        el.appendChild(createEl(turn));
        outArr[row][col] = turn;
        turn = States.X;
      }

      const winner = checkWinner(outArr);

      if (winner) {
        winnerContainer.style.opacity = '1';
        board.style.pointerEvents = 'none';
        board.style.zIndex = '0';

        if (winner !== States.D) { winnerEl!.innerText = `Winner is ${winner}`; } else { document.getElementById('winner')!.innerText = 'Draw!'; }

        winnerContainer?.addEventListener('click', function () {
          reset();
          this.style.opacity = '0';
        });
      }
    }
  });
});

toggleButton?.addEventListener('click', toggleListener);
