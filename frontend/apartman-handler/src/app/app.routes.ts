import { Routes } from '@angular/router';
import { CommonComponent } from './components/common-component/common-component';
import { CalendarComponent } from './components/calendar-component/calendar-component';


export const routes: Routes = [
    {
        path: '',
        component: CommonComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./components/wellcome-component/wellcome-component').then((m) => m.WellcomeComponent),
            },
            {
                path: 'login',
                loadComponent: () => import('./components/login-component/login-component').then((m) => m.LoginComponent),
            },
            {
                path: 'create-account',
                loadComponent: () => import('./components/create-account-component/create-account-component').then((m) => m.CreateAccountComponent),
            },
            {
                path: 'calendar',
                component: CalendarComponent
            },
            {
                path: 'booking-confirmed',
                loadComponent: () => import('./components/booking-confirmed-component/booking-confirmed-component').then((m) => m.BookingConfirmedComponent)
            }
        ]
    }
];
