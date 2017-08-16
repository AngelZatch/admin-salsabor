import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';

@Injectable()
export class AttendanceService {

    constructor(private http: Http) { }

    getAttendance(dates) {
        return this.http.post(environment.apiUrl + '/planning/frequentation', dates)
            .map((response: Response) => {
                return response.json();
            });
    }

}
