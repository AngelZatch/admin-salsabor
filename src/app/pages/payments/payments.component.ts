import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { ProductService } from './../../services/product.service';
import { ExportService } from '../../services/export.service';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
    providers: [ProductService, ExportService, DatePipe]
})
export class PaymentsComponent implements OnInit {

    list = [];
    dates = {
        start: null,
        end: null
    };
    page: string;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private exportService: ExportService
    ) {
        this.page = route.snapshot.url.join('');
    }

    ngOnInit() {
        this.dates.start = moment().subtract(1, 'months').format('YYYY-MM-DD');
        this.dates.end = moment().format('YYYY-MM-DD');
        this.getPayments();
    }

    getPayments() {
        this.productService.getPayments(this.dates).subscribe(
            data => {
                this.list = data;
            }
        );
    }

    export() {
        this.exportService.export(this.page, this.list);
    }

}
