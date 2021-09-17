// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from '@jest/globals';
import { PlayerStates, States } from '../src/scripts/constants';
import { checkWinner, createEl } from '../src/scripts/utils';

describe('Create Element', () => {
  it('Creates X element', async () => {
    const el = createEl(PlayerStates.X);

    expect(el.tagName).toMatch(/div/i);
    expect(el.classList.length).toBeGreaterThan(0);
    expect(el.classList).toContain('text');
    expect(el.hasChildNodes).toBeTruthy();
    expect(el.firstChild).toEqual(el.lastChild);
    expect(el.firstChild.textContent).toEqual('X');
  });

  it('Creates O element', async () => {
    const el = createEl(PlayerStates.O);

    expect(el.tagName).toMatch(/div/i);
    expect(el.classList.length).toBeGreaterThan(0);
    expect(el.classList).toContain('text');
    expect(el.hasChildNodes).toBeTruthy();
    expect(el.firstChild).toEqual(el.lastChild);
    expect(el.firstChild.textContent).toEqual('O');
  });
});

describe('Check Winner', () => {
  it('Checks all NA', async () => {
    const outArr = Array(3).fill(['NA', 'NA', 'NA']);
    const winner = checkWinner(outArr);
    expect(winner).toBe(undefined);
  });

  it('Checks row X winner', async () => {
    const outArr = [['X', 'X', 'X'], ['NA', 'NA', 'NA'], ['NA', 'NA', 'NA']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.X);
  });

  it('Checks row O winner', async () => {
    const outArr = [['O', 'O', 'O'], ['NA', 'NA', 'NA'], ['NA', 'NA', 'NA']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.O);
  });

  it('Checks multiple row winner', async () => {
    const outArr = [['O', 'O', 'O'], ['O', 'O', 'NA'], ['NA', 'NA', 'NA']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.O);
  });

  it('Checks multiple row winner for invalid state', async () => {
    const outArr = [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.INVALID);
  });

  it('Checks column winner', async () => {
    const outArr = [['X', 'X', 'O'], ['X', 'O', 'X'], ['X', 'O', 'O']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.X);
  });

  it('Checks primary diagonal winner', async () => {
    const outArr = [['X', 'O', 'O'], ['O', 'X', 'O'], ['X', 'O', 'X']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.X);
  });

  it('Checks secondary diagonal winner', async () => {
    const outArr = [['X', 'O', 'X'], ['O', 'O', 'X'], ['O', 'O', 'X']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.O);
  });

  it('Checks draw', async () => {
    const outArr = [['X', 'O', 'O'], ['O', 'X', 'X'], ['X', 'X', 'O']];
    const winner = checkWinner(outArr);
    expect(winner).toBe(States.D);
  });
});
