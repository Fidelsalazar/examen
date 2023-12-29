import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from "@angular/core";
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//Services
import { ApiService } from './services/api.service';
import { ResponseInterfaceData } from './core/models/response/ResponseInterfaceData.interface';

interface Product {
  id: number,
  title: string,
  category: string,
  price: number,
  description: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  limit!: number;
  
  products: Product[] =[];
  filterTitles: any;

  selectedValue: string = '';
  options = [
   { value : 'asc', label:'ascendente'},
   { value : 'desc', label : 'descendente'},
  ]

  onSelectionChange(event: any) {
    console.log(this.selectedValue);
    this.api.getProductsOrder(this.selectedValue).subscribe((data:any) => {
      console.log(data)
      if(Array.isArray(data)){
        this.products = data as Product[];
      };
      console.log(this.products)
    })
  }

  constructor(
    private api : ApiService
  ){}

  searchProduct(){
    this.api.getProducts().subscribe((data: Product[]) => {
      console.log(data);
      if(data)
      this.products = data;
      console.log("product",this.products);
    })
  }

  onSendLimit(){
    console.log(this.limit)
    this.api.getProductslimit(this.limit).subscribe((data: any)=>{
        if(Array.isArray(data)){
          this.products = data as Product[];
        };
        console.log(this.products)
      })
  }

  onSendSelect(){
    console.log(this.selectedValue);
   
  }

  ngOnInit():void{
    this.searchProduct();
  }
}

@Pipe({
  name: 'filter'
})

export class FilterTitlePipe implements PipeTransform {
  transform(value: any, title: any) : any {
    if (!Array.isArray(value) || !title) return value;

      const resultProducts = [];

      for(const product of value){
          if(product.title.toLowerCase().indexOf(title.toLowerCase())> -1){
              resultProducts.push(product)
          }
      }
    return resultProducts;
  }

}

@NgModule({
  declarations: [
    AppComponent,
    FilterTitlePipe
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));