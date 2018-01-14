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
    products;

    constructor(
        productService: ProductService
    ) {
        productService.index().subscribe(
            products => {
                this.products = products;
                const productsIds = _.map(this.products, 'product_id');
                console.log(productsIds);
                productService.sales(productsIds).subscribe(
                    sales => {
                        console.log(sales);
                        let productSales = [];
                        for (let i = 0; i < this.products.length; i++) {
                            // Take only sales from that product
                            productSales = _.filter(sales, { id_produit_foreign: productsIds[i] });
                            console.log(productSales);

                            // Run the median, add it to the products array
                            this.products[i]['median_price'] = this.computeMedianPrice(productSales);
                        }
                        console.log(this.products);
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
        let medianPrice;
        let i = 0;
        _.each(sales, (sale) => {
            i++;
            medianPrice += sale.prix_achat / i;
        });
    }

}
