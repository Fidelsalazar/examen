import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterTitle'
})

export class FilterTitlePipe implements PipeTransform {
    transform(value: any, title: string) : any {
        if(title === '' || title.length < 1 ) return value;

        const resultProducts = [];

        for(const product of value){
            if(product.title.toLowerCase().indexOf(title.toLowerCase())> -1){
                resultProducts.push(product)
            }
        }
    }

}