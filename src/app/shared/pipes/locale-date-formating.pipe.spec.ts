import { LocaleDateFormatingPipe } from './locale-date-formating.pipe';

describe('LocaleDateFormatingPipe', () => {
  it('create an instance', () => {
    const pipe = new LocaleDateFormatingPipe();
    expect(pipe).toBeTruthy();
  });
});
