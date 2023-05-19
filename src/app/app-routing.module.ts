import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { ParkingLotEditComponent } from './parking-lot/parking-lot-edit/parking-lot-edit.component';
import { CarComponent } from './car/car.component';
import { CarEditComponent } from './car-edit/car-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fetch-data', component: FetchDataComponent},
  { path: 'parking-lot', component: ParkingLotComponent },
  { path: 'parking-lot-edit/:id', component: ParkingLotEditComponent },
  { path: 'cars', component: CarComponent },
  { path: 'car-add', component: CarEditComponent },
  { path: 'car-edit/:id', component: CarEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
