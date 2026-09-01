import { Routes } from '@angular/router';
import { Login } from './Component/login/login';
import { Home } from './Component/home/home';
import { Profile } from './Component/profile/profile';
import { Tickit } from './Component/tickit/tickit';
import { TrainList } from './Component/train-list/train-list';
import { BookingPage } from './Component/booking-page/booking-page';
import { AddTrain } from './Component/add-train/add-train';
import { AdminTrainList } from './Component/admin-train-list/admin-train-list';
import { AdminHome } from './Component/admin-home/admin-home';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'login',component:Login},
    { path: 'home', component: Home},
    { path: 'profile', component: Profile},
    { path: 'tickit', component:Tickit},
    { path: 'train-list', component:TrainList},
    { path: 'booking-page', component:BookingPage},


    {
        path:'admin',
        children:[
            {path: '',component:AdminHome},
            {path: 'add-train',component:AddTrain},
            {path: 'train-list',component:AdminTrainList}
        ]
    }
];
