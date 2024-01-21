function reverseDict(dictionary: Record<string, string>): Record<string, string> {
  const reversedDict: Record<string, string> = {};
  for (const [key, value] of Object.entries(dictionary)) {
    reversedDict[value] = key;
  }
  return reversedDict;
}

function transpileCustomToTS(customCode: string, mapping: Record<string, string>): string {
  let tsCode = '';
  const reversedMapping = reverseDict(mapping);
  const lines = customCode.split('\n');

  for (const line of lines) {
    const tokens = line.split(' ');
    for (const token of tokens) {
      if (token in reversedMapping) {
        const mappedToken = reversedMapping[token];
        tsCode += mappedToken + ' ';
      } else if (token === '\n') {
        tsCode += '\n';
      } else {
        tsCode += token + ' ';
      }
    }
    tsCode += '\n';
  }

  return tsCode.trim();
}

const sampleCode = ``;

const mapping: Record<string, string> = {
  "=": "baby-talk-is",
  "if": "goo-goo_check",
  "else": "baby-boom",
  "else if": "tiny-boom",
  "true": "cutey",
  "false": "nopey-dopey",
  "null": "blankie",
  "undefined": "uh-oh",
  "throw": "tossie",
  "try": "baby_steps",
  "catch": "catchie-catchie",
  "const": "snuggles",
  "let": "lets-play",
  "===": "goo-goo_gaa-gaa",
  "{": "(",
  "}": ")"
};


// const tsCode = transpileCustomToTS(customCode, mapping);

const transpileWithDefault = (customCode: string): string => transpileCustomToTS(customCode, mapping);

export {
  transpileWithDefault,
  sampleCode
}