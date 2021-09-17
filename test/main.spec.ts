// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from '@jest/globals';
import { sayHello2 } from '../src/main';

describe('Tests index', () => {
  it('says hello', async () => {
    const hello = sayHello2();

    expect(hello).toContain('hello');
  });
});
