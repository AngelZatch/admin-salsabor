import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ProductService } from './../../services/product.service';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
    providers: [ProductService]
})
export class PaymentsComponent implements OnInit {

    list = [];
    dates = {
        start: null,
        end: null
    };

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.dates.start = moment().subtract(1, 'months').format('YYYY-MM-DD');
        this.dates.end = moment().format('YYYY-MM-DD');
        this.getPayments();
    }

    getPayments(){
        this.productService.getPayments(this.dates).subscribe(
            data => {
                this.list = data;
            }
        )
    }

}
