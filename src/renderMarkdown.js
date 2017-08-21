import { readMarkdownFile } from './readFile';

export function renderMarkdown(fileName, path = 'guides') {
  const file = readMarkdownFile(fileName, path);
  // const lines = splitToLines(file);
  return convertMarkdown(file);
  // let guide = '';
  // for (let i = 0; i < lines.length; i++) {
  //   let line = convertMarkdown(lines[i]);
  //   guide = guide.concat(line);
  // }
  // return guide;
}

export function convertMarkdown(file) {
  let newFile = file;
  newFile = newFile.replace(/```(?=\w)/g, '<pre><code>');
  newFile = newFile.replace(/```(?!\w)/g, '</code></pre>');
  newFile = newFile.replace(/`(?=\w)/g, '<code>');
  newFile = newFile.replace(/`(?!\w)/g, '</code>');
  newFile = newFile.replace(/(####)(\s)(.*)/g, (match, p1, p2, p3) => {
    return `<h4>${p3}</h4>`;
  });
  newFile = newFile.replace(/(###)(\s)(.*)/g, (match, p1, p2, p3) => {
    return `<h3>${p3}</h3>`;
  });
  newFile = newFile.replace(/(##)(\s)(.*)/g, (match, p1, p2, p3) => {
    return `<h2>${p3}</h2>`;
  });
  newFile = newFile.replace(/(#)(\s)(.*)/g, (match, p1, p2, p3) => {
    return `<h1>${p3}</h1>`;
  });
  newFile = newFile.replace(/(\*\*)(.*)(\*\*)/g, (match, p1, p2) => {
    return `<b>${p2}</b>`;
  });
  newFile = newFile.replace(/(__)(.*)(__)/g, (match, p1, p2) => {
    return `<b>${p2}</b>`;
  });
  newFile = newFile.replace(/(\*)(.*)(\*)/g, (match, p1, p2) => {
    return `<i>${p2}</i>`;
  });
  newFile = newFile.replace(/(_)(.*)(_)/g, (match, p1, p2) => {
    return `<i>${p2}</i>`;
  });
  newFile = newFile.replace(/(~~)(.*)(~~)/g, (match, p1, p2) => {
    return `<s>${p2}</s>`;
  });
  newFile = newFile.replace(/\*\s(.*)/, (match, p1) => {
    return `<ul><li>${p1}</li>`;
  });
  newFile = newFile.replace(/\*\s(.*)/g, (match, p1) => {
    return `<li>${p1}</li>`;
  });
  newFile = newFile.replace(/\r?\n|\r/g, '</br>');
  return removeNewLinesAndIndentation(newFile);
}

export function makeLists(file) {
  let list = '';
  let firstItem = true;
  let secondList = false;
  let listMade = false;

  list = file.replace(
    /(?:(?:^\*\s{1})(.*))|(?:^\s{4}\*\s(.*))/gm,
    (match, m1, m2) => {
      let newLine = '';
      if (m1) {
        if (secondList) {
          secondList = false;
          firstItem = true;
        }
        if (firstItem) {
          newLine = '<ul>';
        }
        newLine += `<li>${m1.trim()}</li>`;
        firstItem = false;
      } else if (m2) {
        if (secondList) {
          newLine += `<li>${m2.trim()}</li>`;
        } else {
          newLine += `<ul><li>${m2.trim()}</li>`;
          secondList = true;
        }
      }
      listMade = true;
      return newLine;
    }
  );
  if (listMade) {
    list += '</ul>';
  }
  if (secondList) {
    list += '</ul></li>';
  }
  // const newList = list.replace(/\r?\n|\r/g, '');
  // return newList;
  return list;
}

export function splitToLines(file) {
  const matchAllNewLineFormats = /\r?\n|\r/g;
  if (file.match(matchAllNewLineFormats)) {
    return file.split(matchAllNewLineFormats);
  } else {
    return null;
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

// list = file.replace(
//   /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
//   (match, m1, m2, m3, m4) => {
