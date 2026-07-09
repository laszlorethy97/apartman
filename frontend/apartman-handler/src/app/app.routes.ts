import { Routes } from '@angular/router';
import { CommonComponent } from './components/common-component/common-component';
import { LoginComponent } from './components/login-component/login-component';


export const routes: Routes = [
    {
        path: '',
        component: CommonComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
            },
        ]
    }
];
