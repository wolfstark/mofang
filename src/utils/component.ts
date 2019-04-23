export function findComponentDom(id) {
  return document.querySelector(`[data-uid='${id}']`);
}
