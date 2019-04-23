import { recursiveFind } from '@/utils';
import _ from 'lodash';
import pretty from 'pretty';
import { LIB_MAP, PropType } from '@/constant';
import uppercamelcase from 'uppercamelcase';
import camelcase from 'camelcase';
import { ComponentInfo, ListenersInfo } from './widget';

// 拼接组件属性
export function stringifyProps({ props, config }) {
  function stringifyProp(key, val, type) {
    return `${type !== PropType.String ? ':' : ''}${key}="${val}"`;
  }
  const propsModel = config.Props;
  return propsModel.reduce(
    (pre, { key, type, default: defaultValue }) => (defaultValue === props[key] ? pre : `${pre} ${stringifyProp(key, props[key], type)}`),
    '',
  );
}

// 拼接组件样式
export function stringifyStyles(styles) {
  const styleList = Object.keys(styles)
    .map(key => (styles[key] ? `${key}:'${styles[key]}'` : null))
    .filter(style => Boolean(style))
    .join(',');

  return styleList ? `:style="{${styleList}}"` : '';
}

function handleName(key, id) {
  return camelcase(['handle', key, id]);
}

function stringifyListeners(id: string, listeners: ListenersInfo) {
  return Object.keys(listeners)
    .filter(eventName => listeners[eventName].length > 0)
    .reduce((pre, eventName) => `${pre} @${eventName}="${handleName(eventName, id)}"`, '');
}

// 组件转换为模板字符串
export function stringifyTemplate(components: ComponentInfo) {
  if (!components) {
    return '';
  }
  const {
    props: { slots, ...props },
    setting: { tag, config },
    id,
  } = components;

  const children = slots.length ? slots.map(stringifyTemplate).join('') : '';

  return `<${tag} ${stringifyProps({ props, config })} ${stringifyStyles(
    props.style,
  )} ${stringifyListeners(id, props.listeners)}>${children}</${tag}>`;
}

function stringifyMethods(components: ComponentInfo): string {
  const handleList = [];

  recursiveFind(
    components,
    (component: ComponentInfo) => {
      Object.keys(component.props.listeners).forEach((eventName) => {
        if (component.props.listeners[eventName].length === 0) return;

        const chian = component.props.listeners[eventName].reduce(
          (pre, task) => `${pre}.use(Middleware.${task.name}(${JSON.stringify(task.option)}))`,
          '',
        );

        handleList.push(`${handleName(eventName, component.id)}(){
          const pipe = new Pipe();
          pipe${chian}.exec();
        }`);
      });
    },
    'props.slots',
  );

  return handleList.length ? `methods:{${handleList}},` : '';
}

export function stringifyScript(components) {
  let deps = [];

  const methodList = stringifyMethods(components);

  if (components) {
    recursiveFind(
      components,
      ({ setting }) => {
        deps.push({
          lib: setting.lib,
          module: setting.module,
          tag: setting.tag,
        });
      },
      'props.slots',
    );
    deps = _.uniqWith(deps, _.isEqual);

    if (methodList) {
      deps.push({
        lib: 'magic-ui',
        module: 'pipe',
      });
      deps.push({
        lib: 'magic-ui',
        module: 'middleware',
      });
    }
  }

  const importList = deps
    .map(
      dep => `import ${uppercamelcase(dep.module)} from '${dep.lib + LIB_MAP[dep.lib] + dep.module}';`,
    )
    .join('');

  const intallList = deps
    .filter(dep => Boolean(dep.tag))
    .map(dep => `'${dep.tag}':${uppercamelcase(dep.module)}`)
    .join(',\n  ');

  return `<script>
            ${importList}
            export default {
              components:{
                ${intallList}
              },
              ${methodList}
            }
          </script>`;
}
/**
 *
 * @param {any[]} components
 * @return {String} 返回vue模板文件
 */
export function stringifyComponent(components, isPretty = true) {
  // let styles = components.find(component => component.setting.label === 'style');
  // styles = `<style lang="css" scoped>${styles ? styles.props.domProps.innerText : ''}</style>`;
  const scripts = stringifyScript(components);
  // TODO: 添加style支持
  const styles = '<style lang="css" scoped></style>';
  const template = `<template>${stringifyTemplate(components)}</template>`;
  if (isPretty) {
    return pretty(`${template}${scripts}${styles}`);
  }
  return `${template}${scripts}${styles}`;
}
