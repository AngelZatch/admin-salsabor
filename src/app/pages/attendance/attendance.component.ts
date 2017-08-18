import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { AttendanceService } from './../../services/attendance.service';
import { ExportService } from '../../services/export.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
    providers: [AttendanceService, ExportService, DatePipe]
})
export class AttendanceComponent implements OnInit {

    list = [];
    dates = {
        start: null,
        end: null
    };
    page: string;

    constructor(
        private route: ActivatedRoute,
        private attendanceService: AttendanceService,
        private exportService: ExportService
    ) {
        this.page = route.snapshot.url.join('');
    }

    ngOnInit() {
        this.dates.start = moment().subtract(1, 'months').format('YYYY-MM-DD');
        this.dates.end = moment().format('YYYY-MM-DD');
        this.getAttendance();
    }

    getAttendance() {
        this.attendanceService.getAttendance(this.dates).subscribe(
            data => {
                this.list = data;
            }
        );
    }

    export() {
        this.exportService.export(this.page, this.list);
    }

}
