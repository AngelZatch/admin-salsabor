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
                'url': 'profits',
                'name': 'Rentabilité'
            },
            {
                'url': 'attendance',
                'name': 'Fréquentation'
            },
            {
                'url': 'payments',
                'name': 'Paiements'
            }
        ];
    }

}
