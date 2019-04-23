const files = require.context('.', true, /\.(\/[^/]+){2}\.ts$/);
const libRE = /\.\/(.+?)\/(.+?)\.ts/;

function classifyModule(key: string) {
  const match = key.match(libRE);
  const name = match[2];
  return { ...files(key).default, name };
}

const middlewareList = files.keys().map(classifyModule);

export interface TaskSetting {
  label: string;
  inputType: string;
}

export default Object.freeze(middlewareList);
