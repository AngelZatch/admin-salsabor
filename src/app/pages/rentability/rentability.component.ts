import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ProductService } from './../../services/product.service';

@Component({
    selector: 'app-rentability',
    templateUrl: './rentability.component.html',
    styleUrls: ['./rentability.component.scss'],
    providers: [ProductService]
})
export class RentabilityComponent implements OnInit {
    products = [];
    volumeProducts = [];
    timeProducts = [];

    constructor(
        productService: ProductService
    ) {
        productService.index().subscribe(
            products => {
                this.products = products;
                let productsIds = _.map(this.products, 'product_id');
                productService.sales(productsIds).subscribe(
                    sales => {
                        let productSales = [];
                        for (let i = 0; i < this.products.length; i++) {
                            // Take only sales from that product
                            productSales = _.filter(sales, { id_produit_foreign: productsIds[i] });

                            // Run the median, add it to the products array
                            this.products[i]['sales'] = productSales.length;
                            this.products[i]['median_price'] = this.computeMedianPrice(productSales);

                            // Sort products into the 2 main categories
                            if (this.products[i].product_size === 0) {
                                const weeklyRate = this.products[i]['median_price'] / (this.products[i].product_validity / 7);
                                this.products[i]['weekly_rate'] = weeklyRate.toFixed(2);
                                this.timeProducts.push(this.products[i]);
                            } else {
                                const hourlyRate = this.products[i]['median_price'] / this.products[i].product_size;
                                this.products[i]['hourly_rate'] = hourlyRate.toFixed(2);
                                this.volumeProducts.push(this.products[i]);
                            }
                        }
                        productsIds = _.map(this.timeProducts, 'product_id');
                        productService.usages(productsIds).subscribe(
                            usages => {
                                let productUsages = [];
                                for (let i = 0; i < this.timeProducts.length; i++) {
                                    productUsages = _.filter(usages, { id_produit_foreign: this.timeProducts[i].product_id });

                                    this.timeProducts[i]['usages'] = productUsages.length;
                                    console.log(this.timeProducts[i]['hourly_rate']);
                                    const hourlyRate = (this.timeProducts[i]['median_price'] / this.timeProducts[i]['usages']) * this.timeProducts[i]['sales'];
                                    this.timeProducts[i]['hourly_rate'] = hourlyRate.toFixed(2);
                                    console.log(this.timeProducts[i]['hourly_rate']);
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    ngOnInit() {
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

}
