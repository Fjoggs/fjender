import log from 'fjogger';
import readHtmlFile from './readFile';

export function render(fileName, vars, path) {
  let template = readHtmlFile(fileName, path);
  if (vars) {
    Object.keys(vars).forEach(key => {
      template = template.replace(`{{${key}}}`, vars[key]);
      template = template.replace(`{-${key}-}`, vars[key]);
    });
  }
  if (template.match(/{-\w*-}/g)) {
    log(
      'info',
      `removing non matched optional vars: ${template.match(/{-\w*-}/g)}`
    );
    template = template.replace(/{-\w*-}/g, '');
  }
  if (template.match(/{{\w*}}/g)) {
    log('error', 'render failed due to missing variables');
    throw Error(
      `Render failed due to missing variables: ${template.match(/{{\w*}}/g)}`
    );
  } else {
    return removeNewLinesAndIndentation(template);
  }
}

function removeNewLinesAndIndentation(template) {
  const matchAllNewLineFormats = /\r?\n|\r/g;
  const newString = template.replace(matchAllNewLineFormats, '');
  return removeIndentation(newString);
}

export function removeIndentation(template) {
  const charArray = Array.from(template.trim());
  let i = charArray.length;
  while (i-- > 0) {
    if (
      (charArray[i] === ' ' && charArray[i - 1] === ' ') ||
      (charArray[i - 1] === '>' && charArray[i] === ' ')
    ) {
      charArray.splice(i, 1);
    }
  }
  return charArray.join('');
}
