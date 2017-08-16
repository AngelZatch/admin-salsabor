import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';

@Injectable()
export class ProductService {

    constructor(private http: Http) { }

    getPayments(dates) {
        return this.http.post(environment.apiUrl + '/products/payments', dates)
            .map((response: Response) => {
                return response.json();
            });
    }

}
