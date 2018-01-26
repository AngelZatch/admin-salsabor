import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/pages/home/home.component';
import { AttendanceComponent } from 'app/pages/attendance/attendance.component';
import { PaymentsComponent } from 'app/pages/payments/payments.component';
import { RentabilityComponent } from 'app/pages/rentability/rentability.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'rentability', component: RentabilityComponent}
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