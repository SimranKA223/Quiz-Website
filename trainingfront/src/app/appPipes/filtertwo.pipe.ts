import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertwo'
})
export class FiltertwoPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    if(value.length===0){
      return value;
    }
    return value.filter(function(search: { result: { user: { username: string; }; }; }){
      return search.result?.user?.username?.toLowerCase().indexOf(searchTerm.toLowerCase())>-1;
    });
  }

}
