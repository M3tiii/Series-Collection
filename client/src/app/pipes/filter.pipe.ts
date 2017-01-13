import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    let filter = args[0].toLocaleLowerCase();
    return filter ? value.filter(object => {
      let passes = false;
      for (let property in object) {
        if (property != 'options') {
          passes = passes || (object[property].toLocaleLowerCase().indexOf(filter) != -1);
        }
      }
      return passes;
    }) : value;
  }
}
