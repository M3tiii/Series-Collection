export interface Element {
  header: string,
  value: any,
  isSortable: boolean,
  isEditable: boolean,
  required: boolean,
  isError: boolean,
  textError: string
}

export function setupElements(elements, config) {
  config.forEach((el) => {
    let newElement = { header: "", value: false, isSortable: false, isEditable: false, type: "text", required: true, isError: false, textError: "" };
    if (el.header) {
      newElement.header = el.header;
    }
    if (el.value) {
      newElement.value = el.value;
    }
    if (el.isSortable) {
      newElement.isSortable = el.isSortable;
    }
    if (el.isEditable) {
      newElement.isEditable = el.isEditable;
    }

    elements.push(newElement);
  })
}

export function getEmptyElement(config) {
  let tmp = {};
  config.forEach((el) => {
    tmp[el.value] = "";
  })
  return tmp;
}
