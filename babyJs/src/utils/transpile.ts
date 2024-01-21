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

const sampleCode = `snuggles x babyTalk 1
letsPlay y babyTalk 2
snuggles t babyTalk cutey
letsPlay f babyTalk nopeyDopey
gooGooCheck (x gooGooGaaGaa y) {
  y babyTalk 1
} tinyBoom (x babyTalk 1) {
  y babyTalk "a"
} babyBoom {
  f babyTalk cutey
}`;

const defaultMapping: Record<string, string> = {
  "=": "babyTalk",
  "if": "gooGooCheck",
  "else": "babyBoom",
  "else if": "tinyBoom",
  "true": "cutey",
  "false": "nopeyDopey",
  "null": "blankie",
  "undefined": "uhOh",
  "throw": "tossie",
  "try": "babySteps",
  "catch": "catchieCatchie",
  "const": "snuggles",
  "let": "letsPlay",
  "===": "gooGooGaaGaa",
  "{": "(",
  "}": ")"
};


const transpile = (code : string, mapping: Record<string, string>) => transpileCustomToTS(code, mapping);

const transpileWithDefault = (customCode: string): string => transpileCustomToTS(customCode, mapping);

interface ReservedWordMapping {
  "=": string;
  "if": string;
  "else": string;
  "else if": string;
  "true": string;
  "false": string;
  "null": string;
  "undefined": string;
  "throw": string;
  "try": string;
  "catch": string;
  "const": string;
  "let": string;
  "===": string;
  "{": string;
  "}": string;
}

export {
  transpile,
  transpileWithDefault,
  sampleCode,
  defaultMapping
}

export type {
  ReservedWordMapping
}