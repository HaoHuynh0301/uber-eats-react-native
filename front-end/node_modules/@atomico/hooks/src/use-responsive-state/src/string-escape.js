let id = Date.now() + Math.random();

export class StringEscape extends String {
  constructor(string, hash) {
    super(string);
    this.hash = hash;
  }
  explode(part) {
    return this.split(part).map((part) => {
      while (true) {
        let nextPart = part.replace(/(-([\d\.]+)-)/, (param1, param2, id) =>
          id in this.hash ? this.hash[id] : param1
        );
        if (nextPart == part) break;
        part = nextPart;
      }
      return part;
    });
  }
}

export function escape(string, escape) {
  const hash = string instanceof StringEscape ? string.hash : {};

  let count = Object.keys(hash).length;

  while (true) {
    const nextString = string.replace(escape, (part) => {
      let nextId = id + count++;
      hash[nextId] = part;
      return `-${nextId}-`;
    });
    if (nextString == string) break;
    string = nextString;
  }

  return new StringEscape(string, hash);
}
