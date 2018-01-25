import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';

@Injectable()
export class ProductService {

    constructor(private http: Http) { }

    index() {
        return this.http.get(environment.apiUrl + '/products')
            .map((response: Response) => {
                return response.json();
            })
    }

    getPayments(dates) {
        return this.http.post(environment.apiUrl + '/products/payments', dates)
            .map((response: Response) => {
                return response.json();
            });
    }

    sales(products){
        return this.http.post(environment.apiUrl + '/products/sales', products)
            .map((response: Response) => {
                return response.json();
            });
    }

    usages(products){
        return this.http.post(environment.apiUrl + '/products/usages', products)
            .map((response: Response) => {
                return response.json();
            });
    }

    rentabilityLimited(){
        return this.http.get(environment.apiUrl + '/products/limited')
            .map((response: Response) => {
                return response.json();
            });
    }

    rentabilityUnlimited(){
        return this.http.get(environment.apiUrl + '/products/unlimited')
        .map((response: Response) => {
            return response.json();
        });
    }

}
