import fs from 'fs';
import log from 'fjogger';

export function readHtmlFile(fileName, path = '') {
  if (!fileName.includes('.html')) {
    const template = fs.readFileSync(
      `./src/templates/${path}/${fileName}.html`,
      'utf8'
    );
    return template;
  } else {
    log('info', 'filename should not include .html');
  }
  return null;
}
