import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlannerComponent } from './planner/planner.component';
import { TrackerComponent } from './tracker/tracker.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo:"home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "planner",
        component: PlannerComponent
    },
    {
        path: "tracker",
        component: TrackerComponent,
        canActivate:[authGuard]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path:"register",
        component: RegisterComponent
    },
    {
        path:"logout",
        redirectTo:"home"
    },
    {
        path:"**",
        redirectTo:"home"
    }
];
