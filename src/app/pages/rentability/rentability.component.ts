import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import * as moment from 'moment';

import { ProductService } from './../../services/product.service';
import { ExportService } from '../../services/export.service';

@Component({
    selector: 'app-rentability',
    templateUrl: './rentability.component.html',
    styleUrls: ['./rentability.component.scss'],
    providers: [ProductService, ExportService, DatePipe]
})
export class RentabilityComponent implements OnInit {
    products = [];
    volumeProducts = [];
    timeProducts = [];
    startDate = null;
    endDate = null;

    constructor(
        private productService: ProductService,
        private exportService: ExportService
    ) {

    }

    ngOnInit() {
        this.startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
        this.endDate = moment().format('YYYY-MM-DD');
        this.get();
    }

    /**
     * Computes the median price for given sales
     *
     * @param {any} sales
     * @memberof RentabilityComponent
     */
    computeMedianPrice(sales) {
        let medianPrice = 0;
        _.each(sales, sale => {
            medianPrice += sale.prix_achat;
        });
        medianPrice /= sales.length;
        return medianPrice.toFixed(2);
    }

    get() {
        this.products = [];
        this.volumeProducts = [];
        this.timeProducts = [];
        this.productService.index().subscribe(
            products => {
                this.products = products;
                let productsIds = _.map(this.products, 'product_id');
                this.productService.sales({ products: productsIds, start: this.startDate, end: this.endDate }).subscribe(
                    sales => {
                        let productSales = [];
                        for (let i = 0; i < this.products.length; i++) {
                            // Take only sales from that product
                            productSales = _.filter(sales, { id_produit_foreign: productsIds[i] });

                            // Run the median, add it to the products array
                            this.products[i]['sales'] = productSales.length;
                            this.products[i]['median_price'] = (productSales.length !== 0) ? this.computeMedianPrice(productSales) : '--';
                            this.products[i]['revenue'] = (productSales.length !== 0) ? (this.products[i]['sales'] * this.products[i]['median_price']).toFixed(2) : '--';

                            // Sort products into the 2 main categories
                            if (this.products[i].product_size === 0) {
                                const weeklyRate = this.products[i]['median_price'] / (this.products[i].product_validity / 7);
                                this.products[i]['weekly_rate'] = !isNaN(weeklyRate) ? weeklyRate.toFixed(2) : '--';
                                this.timeProducts.push(this.products[i]);
                            } else {
                                const hourlyRate = this.products[i]['median_price'] / this.products[i].product_size;
                                this.products[i]['hourly_rate'] = !isNaN(hourlyRate) ? hourlyRate.toFixed(2) : '--';
                                this.volumeProducts.push(this.products[i]);
                            }
                        }
                        productsIds = _.map(this.timeProducts, 'product_id');
                        this.productService.usages({ products: productsIds, start: this.startDate, end: this.endDate }).subscribe(
                            usages => {
                                let productUsages = [];
                                for (let i = 0; i < this.timeProducts.length; i++) {
                                    productUsages = _.filter(usages, { id_produit_foreign: this.timeProducts[i].product_id });

                                    this.timeProducts[i]['usages'] = productUsages.length;
                                    const hourlyRate = this.timeProducts[i]['revenue'] / this.timeProducts[i]['usages'];
                                    this.timeProducts[i]['hourly_rate'] = !isNaN(hourlyRate) ? hourlyRate.toFixed(2) : '--';
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    export() {
        this.exportService.export('rentability', _.concat(this.timeProducts, this.volumeProducts));
    }

}
