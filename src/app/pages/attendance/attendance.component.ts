import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AttendanceService } from './../../services/attendance.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
    providers: [AttendanceService]
})
export class AttendanceComponent implements OnInit {

    list = [];
    dates = {
        start: null,
        end: null
    };

    constructor(
        private attendanceService: AttendanceService
    ) { }

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
        )
    }

}
