import { Routes } from '@angular/router';
import { CommonComponent } from './components/common-component/common-component';

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
                path: 'booking-confirmed',
                loadComponent: () => import('./components/booking-confirmed-component/booking-confirmed-component').then((m) => m.BookingConfirmedComponent),
            },
            {
                path: 'something-went-wrong',
                loadComponent: () => import('./components/something-went-wrong-component/something-went-wrong-component').then((m) => m.SomethingWentWrongComponent),
            },
            {
                path: 'our-story',
                loadComponent: () => import('./components/our-story-component/our-story-component').then((m) => m.OurStoryComponent),
            },
            {
                path: 'booking',
                loadComponent: () => import('./components/booking-component/booking-component').then((m) => m.BookingComponent),
            },
            {
                path: 'admin',
                loadComponent: () => import('./components/admin-component/admin-component').then((m) => m.AdminComponent),
            }
        ]
    }
];
