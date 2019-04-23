export const noop = () => {};
export const identity = _ => _;

export const spliceIf = (collection, fn) => {
  const index = collection.findIndex(_ => fn(_));
  if (index >= 0) collection.splice(index, 1);
  return collection;
};
/**
 * @desc 匹配中在数组1，否则2
 */
export function partition(collection, predicate) {
  const result = [[], []];
  collection.forEach((_) => {
    result[predicate(_) ? 0 : 1].push(_);
  });
  return result;
}

// 对对象解析路径下的属性
const bailRE = /[^\w.$]/;
export const parsePath = (path) => {
  if (bailRE.test(path)) return null;
  const segments = path.split('.');
  return (obj) => {
    // eslint-disable-next-line
    for (const segment of segments) {
      // eslint-disable-line
      if (!obj) return null;
      obj = obj[segment];
    }
    return obj; //eslint-disable-line
  };
};

/**
 * @desc 递归数组
 * @param {any[]} collection
 * @param {(item:any)=>boolean} predicate 命中条件
 * @param {(item:any,index:number,arr:any[])=>any} iteratee 命中时动作
 * @param {(item:any)=>any} parseChildren 未命中时获取操作路径
 */
function recursive(collection, predicate, iteratee, parseChildren) {
  let children;
  let result;
  for (let i = 0, len = collection.length; i < len; i += 1) {
    const _ = collection[i];
    if (predicate(_)) return iteratee(_, i, collection);
    children = parseChildren(_);
    if (children && children.length) {
      result = recursive(children, predicate, iteratee, parseChildren);
      if (result) return result;
    }
  }
  return null;
}

function map(collection, iteratee, parseChildren, output = [], stack = []) {
  let children;
  for (let i = 0, len = collection.length; i < len; i += 1) {
    const _ = collection[i];
    stack.push(iteratee(_));
    children = parseChildren(_);
    if (children && children.length) map(children, iteratee, parseChildren, output, stack);
    const pNode = stack.pop();
    if (stack.length) {
      const parentNode = stack[stack.length - 1];
      if (!parentNode.children) parentNode.children = [];
      if (pNode) parentNode.children.push(pNode);
    } else {
      output.push(pNode);
    }
  }
  return output;
}

// 递归 components ast map
export function recursiveMap(collection, iteratee, path) {
  const parseChildren = path.includes('.') ? parsePath(path) : _ => _[path];
  return map([collection], iteratee, parseChildren);
}

// 递归查询
export function recursiveFind(collection, predicate, path) {
  if (!collection) return null;
  const parseChildren = path.includes('.') ? parsePath(path) : _ => _[path];
  return recursive([collection], predicate, identity, parseChildren);
}
// 递归删除
export function recursiveSpliceBy(collection, predicate, path) {
  const parseChildren = path.includes('.') ? parsePath(path) : obj => obj[path];
  return recursive([collection], predicate, (_, i, arr) => arr.splice(i, 1), parseChildren);
}

export const bindObject = (vm, data) => {
  const dataKey = Object.keys(data);
  const excludeList = ['class', 'style', 'domProps', 'slots', 'listeners'];
  const $props = vm.props || (vm.$options && vm.$options.props) || {}; // vm will be vueInstance or vueOption
  const attrs = {};
  const props = {};

  dataKey.forEach((key) => {
    if (key in $props) {
      props[key] = data[key];
    } else if (excludeList.indexOf(key) === -1) {
      attrs[key] = data[key];
    }
  });
  return {
    attrs,
    props,
  };
};
