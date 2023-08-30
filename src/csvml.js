class Csvml {
  static parse(input) {
    const objects = [];
    const entries = input.trim().split('\n\n');
    if (entries.length < 2) {
      return objects;
    }
    const definitionLines = entries[0].split('\n');
    for (let idx = 0; idx < definitionLines.length; idx += 1) {
      definitionLines[idx] = definitionLines[idx].split(',').map((token) => token.trim());
    }
    for (const entry of entries.slice(1)) {
      const lines = entry.split('\n');
      if (lines.length < 1) {
        continue;
      }
      if (lines[0].startsWith('#')) {
        continue;
      }
      const obj = {};
      for (let linesIdx = 0; linesIdx < lines.length; linesIdx += 1) {
        const tokens = lines[linesIdx].split(',');
        for (let tokensIdx = 0; tokensIdx < tokens.length; tokensIdx += 1) {
          const key = definitionLines[linesIdx][tokensIdx];
          if (key == null || key === '') {
            continue;
          }
          tokens[tokensIdx] = tokens[tokensIdx].trim();
          if (tokens[tokensIdx].match(/^-?\d*(\.\d+)?$/)) {
            obj[key] = parseFloat(tokens[tokensIdx]);
          } else if (['true', 'false'].includes(tokens[tokensIdx].toLowerCase())) {
            obj[key] = tokens[tokensIdx].toLowerCase() === 'true';
          } else {
            obj[key] = tokens[tokensIdx];
          }
        }
      }
      objects.push(obj);
    }
    return objects;
  }
}

export default Csvml;
