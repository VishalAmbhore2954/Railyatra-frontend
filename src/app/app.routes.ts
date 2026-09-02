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
import { AddStation } from './Component/add-station/add-station';
import { AddRoute } from './Component/add-route/add-route';
import { AddSeats } from './Component/add-seats/add-seats';
import { AddCoach } from './Component/add-coach/add-coach';
import { AdminStationList } from './Component/admin-station-list/admin-station-list';
import { AdminCoachList } from './Component/admin-coach-list/admin-coach-list';
import { AdminRouteList } from './Component/admin-route-list/admin-route-list';
import { AdminSeatList } from './Component/admin-seat-list/admin-seat-list';

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
            {path: 'add-station',component:AddStation},
            {path: 'add-route',component:AddRoute},
            {path: 'add-seat',component:AddSeats},
            {path: 'add-coach',component:AddCoach},
            {path: 'train-list',component:AdminTrainList},
            {path: 'station-list',component:AdminStationList},
            {path: 'coach-list',component:AdminCoachList},
            {path: 'route-list',component:AdminRouteList},
            {path: 'seat-list',component:AdminSeatList}
        ]
    }
];
