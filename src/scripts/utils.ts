import { PlayerStates, States } from './constants';

export const createEl = (playerName: PlayerStates) => {
  const el = document.createElement('div');
  el.classList.add('text');
  el.appendChild(document.createTextNode(playerName));
  return el;
};

export const checkWinner = (arrToCheck: string[][]) => {
  if (arrToCheck.flat().filter((x) => x === PlayerStates.X).length > 5
  || arrToCheck.flat().filter((x) => x === PlayerStates.O).length > 5) { return States.INVALID; }

  for (let i = 0; i < arrToCheck.length; i++) {
    const firstEl = arrToCheck[i][0];
    if (firstEl !== States.NA && arrToCheck[i][1] === firstEl && arrToCheck[i][2] === firstEl) {
      return firstEl;
    }
  }

  for (let i = 0; i < arrToCheck.length; i++) {
    const firstEl = arrToCheck[0][i];
    if (firstEl !== States.NA && arrToCheck[1][i] === firstEl && arrToCheck[2][i] === firstEl) {
      return firstEl;
    }
  }

  if (arrToCheck[0][0] !== States.NA
    && arrToCheck[0][0] === arrToCheck[1][1] && arrToCheck[0][0] === arrToCheck[2][2]) {
    return arrToCheck[0][0];
  }

  if (arrToCheck[0][2] !== States.NA
    && arrToCheck[0][2] === arrToCheck[1][1] && arrToCheck[0][2] === arrToCheck[2][0]) {
    return arrToCheck[0][2];
  }

  if (!arrToCheck.flat().filter((x) => x === States.NA).length) { return States.D; }

  return undefined;
};
