import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ApiService{
    private url = "https://fakestoreapi.com/";

    constructor (public http: HttpClient){

    }

    public getProducts():Observable<any>{
        let producturl = this.url + "products";
        return this.http.get(producturl);
    }
    public getProductslimit(limit:number){
        let productlimiturl = `${this.url + "products"}?limit=${limit}`;
        return this.http.get(productlimiturl);
    }

    public getProductsOrder(selectedValue:string){
        let productorderurl =  `${this.url + "products"}?sort=${selectedValue}`
        return this.http.get(productorderurl)
    }
}