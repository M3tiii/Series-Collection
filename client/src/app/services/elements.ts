export interface Element {
  [index: number]: {
    header: string,
    value: any
  }
}

export function setupElements(elements, config) {
  config.forEach((el) => {
    let newElement = { header: "", value: false };
    if (el.header) {
      newElement.header = el.header;
    }
    if (el.value) {
      newElement.value = el.value;
    }
    elements.push(newElement);
  })
}
