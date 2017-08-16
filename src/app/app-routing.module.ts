import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/pages/home/home.component';
import { AttendanceComponent } from 'app/pages/attendance/attendance.component';
import { PaymentsComponent } from 'app/pages/payments/payments.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'payments', component: PaymentsComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}