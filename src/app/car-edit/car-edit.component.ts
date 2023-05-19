import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Car } from '../car/car';
import { ParkingLot } from '../parking-lot/parking-lot';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  carForm!: FormGroup;
  car!: Car;
  parkingLots!: ParkingLot[];

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      id: [''],
      licensePlate: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      parkingLotId: ['', Validators.required]
    });
  
    this.loadParkingLots();
  
    const carId = Number(this.route.snapshot.paramMap.get('id'));
    if (carId) {
      this.loadCar(carId);
    }
    // else: it's for adding a new car, form remains empty
  }
  

  loadParkingLots(): void {
    let url = environment.baseUrl + `api/ParkingLots`;
    this.http.get<ParkingLot[]>(url).subscribe(result => {
      this.parkingLots = result;
    });
  }

  loadCar(id: number): void {
    let url = environment.baseUrl + `api/Cars/${id}`;
    this.http.get<Car>(url).subscribe(result => {
      this.car = result;
      if (result.parkingLot) {
        this.carForm.patchValue({
          ...result,
          parkingLotId: result.parkingLot.id
        });
      } else {
        this.carForm.patchValue(result);
      }
    });
  }
  

  onSubmit(): void {
    const car = this.carForm.value;
    const selectedParkingLot = this.parkingLots.find(p => p.id === car.parkingLotId);
    car.parkingLot = selectedParkingLot;
    if (car.id) {
      let url = environment.baseUrl + `api/Cars/${car.id}`;
      this.http.put(url, car).subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    } else {
      // it's for adding a new car
      let url = environment.baseUrl + `api/Cars`;

      // Remove the 'id' field when creating a new car
      const { id, ...newCar } = car;

      this.http.post(url, newCar).subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }


  

  onDelete(): void {
    const id = this.car.id;
    const url = environment.baseUrl + `api/Cars/${id}`;

    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Car ${id} was deleted successfully`);
        this.router.navigate(['/car']);
      }
    });
  }
}
