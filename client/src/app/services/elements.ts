export interface Element {
  [index: number]: {
    header: string,
    value: any,
    isSortable: boolean,
  }
}

export function setupElements(elements, config) {
  config.forEach((el) => {
    let newElement = { header: "", value: false, isSortable: false };
    if (el.header) {
      newElement.header = el.header;
    }
    if (el.value) {
      newElement.value = el.value;
    }
    if (el.isSortable) {
      newElement.isSortable = el.isSortable;
    }
    elements.push(newElement);
  })
}
