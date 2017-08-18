import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class ExportService {
    date;

    constructor(
        private datePipe: DatePipe
    ) { }

    export(page: string, haystack: any) {
        const data = haystack;

        const csvData = this.convertToCSV(data);

        const blob = new Blob([csvData], { type: 'text/csv' });

        const date = new Date();
        this.date = this.datePipe.transform(date, 'dd-MM-y');

        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = page + '_' + this.date + '_.csv';
        a.click();

        document.body.removeChild(a);
    }

    convertToCSV(data) {
        const array = typeof data !== 'object' ? JSON.parse(data) : data;
        let str = '';
        let row = '';

        // tslint:disable-next-line:forin
        for (const index in data[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            // tslint:disable-next-line:forin
            for (const index in array[i]) {
                if (line !== '') {
                    line += ',';
                }
                line += '\"' + array[i][index] + '\"';
            }
            str += line + '\r\n';
        }
        return str;
    }

}
