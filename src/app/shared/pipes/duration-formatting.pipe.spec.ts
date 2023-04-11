import { DurationFormattingPipe } from './duration-formatting.pipe';

describe('DurationFormattingPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationFormattingPipe();
    expect(pipe).toBeTruthy();
  });
});
