import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { ParkingLot } from '../parking-lot';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parking-lot-edit',
  templateUrl: './parking-lot-edit.component.html',
  styleUrls: ['./parking-lot-edit.component.css']
})
export class ParkingLotEditComponent implements OnInit {
  parkingLot?: ParkingLot;
  form!: FormGroup;
  id!: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl(''),
        capacity: new FormControl(''),
        availableSpaces: new FormControl(''),
      }
    );

    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== 'new') {
      this.loadData(idParam);
    }
  }

loadData(id: string): void {
    let url = environment.baseUrl + `api/ParkingLots/${id}`;
    this.http.get<ParkingLot>(url).subscribe(result => {
      this.parkingLot = result;
      this.form.patchValue(this.parkingLot);
    });
  }

  onSubmit() {
    let parkingLot = this.parkingLot || {} as ParkingLot;

    parkingLot.name = this.form.controls['name'].value;
    parkingLot.capacity = this.form.controls['capacity'].value;
    parkingLot.availableSpaces = this.form.controls['availableSpaces'].value;

    if (this.parkingLot) {
      this.updateParkingLot(parkingLot);
    } else {
      this.addParkingLot(parkingLot);
    }
  }

  updateParkingLot(parkingLot: ParkingLot) {
    let url = environment.baseUrl + `api/ParkingLots/${parkingLot.id}`;
    this.http.put<ParkingLot>(url, parkingLot).subscribe({
      next: () => {
        console.log(`Parking Lot ${parkingLot.id} was updated successfully`);
        this.router.navigate(['/parking-lot']);
      }
    });
  }

  addParkingLot(parkingLot: ParkingLot) {
    let url = environment.baseUrl + 'api/ParkingLots';
    this.http.post<ParkingLot>(url, parkingLot).subscribe({
      next: (result) => {
        console.log(`Parking Lot was added successfully`);
        this.router.navigate(['/parking-lot']);
      }
    });
  }
}
