import { removeIndentation, render } from '../src/render.js';

describe('Render', () => {
  describe('removeIndentation should remove indenation', () => {
    it('from a one liner', () => {
      const string = '  <div>test string</div>';
      const actual = removeIndentation(string);
      const expected = '<div>test string</div>';
      expect(actual).toEqual(expected);
    });

    it('from mulitple lines', () => {
      const string =
        '  <div>test string</div>    <div>second test string</div>';
      const actual = removeIndentation(string);
      const expected = '<div>test string</div><div>second test string</div>';
      expect(actual).toEqual(expected);
    });

    it('from pyramid string', () => {
      const string = '<div>   <div>test string</div>    </div>';
      const actual = removeIndentation(string);
      const expected = '<div><div>test string</div></div>';
      expect(actual).toEqual(expected);
    });
  });

  describe('render', () => {
    it('should replace mandatory vars', () => {
      const vars = { mandatory: 'test' };

      const actual = render('testTemplate', vars, 'test');
      const expected = '<html><head><title>test</title></head></html>';
      expect(actual).toEqual(expected);
    });

    it('should replace optional vars if provided', () => {
      const vars = { mandatory: 'test', optional: 'optional test' };

      const actual = render('testTemplateOptional', vars, 'test');
      const expected =
        '<html><head><title>test optional test</title></head></html>';
      expect(actual).toEqual(expected);
    });

    describe('should throw error', () => {
      it('showing missing var', () => {
        function missingVariables() {
          const vars = { invalid: 'true' };
          render('testTemplate', vars, 'test');
        }
        expect(missingVariables).toThrow(
          'Render failed due to missing variables: {{mandatory}}'
        );
      });

      it('showing missing vars', () => {
        function missingVariables() {
          const vars = { invalid: 'true' };
          render('testTemplateMultipleMandatory', vars, 'test');
        }
        expect(missingVariables).toThrow(
          'Render failed due to missing variables: {{mandatory}},{{alsoMandatory}}'
        );
      });
    });

    it('should allow templates without vars to render', () => {
      const actual = render('testTemplateNoVars', {}, 'test');
      const expected = `<html><div>It's empty!</div></html>`;
      expect(actual).toEqual(expected);
    });

    it('should discard optional vars if not provided', () => {
      const vars = { mandatory: 'test' };

      const actual = render('testTemplateOptional', vars, 'test');
      const expected = '<html><head><title>test </title></head></html>';
      expect(actual).toEqual(expected);
    });

    it('should throw error if invalid path', () => {});

    it('should render static pages', () => {});
  });
});
