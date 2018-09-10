const { RGBToHex } = require('./colorConverter');

describe('Should test Color Converter functions', () => {
  it('Should convert RGB color to hex', () => {
    const red = { r: 255, g: 0, b: 0 };
    expect(RGBToHex(red)).toBe('#ff0000');
  });

  it('Should normalize RGB color and convert to hex', () => {
    const red = { r: 1, g: 0, b: 0 };
    expect(RGBToHex(red, true)).toBe('#ff0000');
  });
});
