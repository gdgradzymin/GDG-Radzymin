import { MdToHtmlPipe } from './md-to-html.pipe';

describe('MdToHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new MdToHtmlPipe(null);
    expect(pipe).toBeTruthy();
  });
});
