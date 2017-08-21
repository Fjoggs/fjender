import { readHtmlFile } from '../src/readFile';

describe('readHtmlFile', () => {
  it('should return a string on success', () => {
    expect(typeof readHtmlFile('testTemplate', 'test')).toBe('string');
  });

  it('should return null if extension is set', () => {
    expect(readHtmlFile('testTemplate.html'), 'test').toBeNull();
  });
});
