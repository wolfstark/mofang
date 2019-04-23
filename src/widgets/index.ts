import WidgetChain, { Widget } from '../utils/widget';

const files = require.context('.', true, /\.(\/[^/]+){2}\.ts$/);
const widgetList: Widget[] = [];
const libRE = /\.\/(.+?)\/(.+?)\.ts/;

/**
 *
 * @param {string} key
 */
function classifyModule(key: string) {
  const match = key.match(libRE);
  const lib = match[1];
  const module = match[2];
  const widgetChain: WidgetChain = files(key).default;

  widgetChain.setMeta(lib, module);
  widgetList.push(widgetChain.toWidget());
}

files.keys().forEach(classifyModule);

export default Object.freeze(widgetList);
