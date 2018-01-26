import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    items;

    constructor() { }

    ngOnInit() {
        this.items = [
            {
                'url': 'attendance',
                'name': 'Fréquentation'
            },
            {
                'url': 'payments',
                'name': 'Paiements'
            },
            {
                'url': 'rentability',
                'name': 'Rentabilité'
            }
        ];
    }

}
