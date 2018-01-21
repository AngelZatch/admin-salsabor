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
                const productsIds = _.map(this.products, 'product_id');
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
