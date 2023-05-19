import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Car } from './car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars!: Car[];
  displayedColumns: string[] = ['id', 'licensePlate', 'brand', 'model', 'year', 'color', 'parkingLot', 'actions'];
  showFlag: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    this.showFlag = localStorage.getItem(environment.roleKey) == environment.role;
   }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    let url = environment.baseUrl + `api/Cars`;
    this.http.get<Car[]>(url).subscribe(result => {
      this.cars = result;
    });
  }

  deleteCar(id: number): void {
    let url = environment.baseUrl + `api/Cars/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.loadCars();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
