import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { CreateAccountComponent } from './pages/dashboard/section/create-account/create-account.component';
import { AccountsComponent } from './pages/dashboard/section/accounts/accounts.component';
import { AssistantComponent } from './pages/dashboard/section/assistant/assistant.component';

import { authGuard } from './core/guards/auth-guard.guard'; // Adjust path accordingly


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard], // Use the functional guard here

        children: [
            { path: '', component: AccountsComponent }, // Default route for dashboard
            { path: 'create-account', component: CreateAccountComponent },
            { path: 'accounts', component: AccountsComponent },
            { path: 'assistant', component: AssistantComponent },
        ]
    },
];