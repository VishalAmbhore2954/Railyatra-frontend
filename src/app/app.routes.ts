import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Tickit } from './tickit/tickit';
import { TrainList } from './train-list/train-list';
import { BookingPage } from './booking-page/booking-page';
import { AddTrain } from './add-train/add-train';
import { AdminTrainList } from './admin-train-list/admin-train-list';

export const routes: Routes = [
    { path:'login',component:Login},
    { path: 'home', component: Home},
    { path: 'profile', component: Profile},
    { path: 'tickit', component:Tickit},
    { path: 'train-list', component:TrainList},
    { path: 'booking-page', component:BookingPage},


    {
        path:'admin',
        children:[
            {path: 'add-train',component:AddTrain},
            {path: 'train-list',component:AdminTrainList}
        ]
    }
];
