import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  it('should display "(Weak)" when strength is 5', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)');
  })
})
