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
            }
        ]
    }
];
