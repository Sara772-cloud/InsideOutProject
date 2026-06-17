import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"login",pathMatch:"full"},
    // TODO: da el auth layout component 
    {path:"",loadComponent:()=> import('./core/layouts/auth-page/auth-page.component').then((c)=>c.AuthPageComponent),
        children:[
            {path:"login",loadComponent:()=> import('./core/auth/login/login.component').then((c)=>c.LoginComponent),title:"login page"},
            {path:"signup",loadComponent:()=> import('./core/auth/signup/signup.component').then((c)=>c.SignupComponent),title:"signup page"},
            {path:"logout",loadComponent:()=> import('./core/auth/logout/logout.component').then((c)=>c.LogoutComponent),title:"logout page"}
        ]
    },
    // TODO:da el main layout component
    {path:"",loadComponent:()=> import('./core/layouts/main-page/main-page.component').then((c)=>c.MainPageComponent),
        children:[
            {path:"",redirectTo:'dashboard',pathMatch:'full'},
            {path:"dashboard",loadComponent:()=> import('./features/dashboard/dashboard.component').then((c)=>c.DashboardComponent),title:"dashboard page"},
            {path:"patients",title:"patients page",
                children:
                [
                    {path:'',loadComponent:()=> import('./features/patients/patients.component').then((c)=>c.PatientsComponent),title:'patients page'},
                    {path:'patientsdetails/:id',loadComponent:()=> import('./features/patientdetails/patientdetails.component').then((c)=>c.PatientdetailsComponent),title:'patient details page'},
            ]},
            {path:"reports",loadComponent:()=> import('./features/reports/reports.component').then((c)=>c.ReportsComponent),title:"reports page"},
            {path:"messages",
                children:[ 
                    // !!  moheeem: hena ana m3rftash a3ml redirectto 3lshan lazam a rediret l7aga path bta3ha t7taha msh arg3ha lnafsaha fa2 
                    {path:'',loadComponent:()=> import('./features/messages/messages.component').then((c)=>c.MessagesComponent),title:"messages page"},
                    {path:"messagesdetails",loadComponent:()=> import('./features/messagedetails/messagedetails.component').then((c)=>c.MessagedetailsComponent),title:"messagesdetails page"},
            ],
            title:"messages details page"},
            {path:"assigntask",loadComponent:()=> import('./features/assigntask/assigntask.component').then((c)=>c.AssigntaskComponent),title:"assigntask page"},
            {path:"settings",loadComponent:()=>import('./features/settings/settings.component').then((c)=>c.SettingsComponent),title:"settings page"}
        ]
    },
    {path:"**",loadComponent:()=>import('./features/notfound/notfound.component').then((c)=>c.NotfoundComponent),title:"not found page"}
];
