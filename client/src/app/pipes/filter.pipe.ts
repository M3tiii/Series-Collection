import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    // console.log(value, args[0]);
    let filter = args[0].toLocaleLowerCase();
    return filter ? value.filter(object => {
      let passes = false;
      for (let property in object) {
        if (property != 'options' && !Array.isArray(object[property]) && !(typeof object[property] === "object") && object[property] != null && !Number.isInteger(object[property])) {
          // console.log('prop', property); //todo fix that
          passes = passes || (object[property].toLocaleLowerCase().indexOf(filter) != -1);
        }
      }
      return passes;
    }) : value;
  }
}
