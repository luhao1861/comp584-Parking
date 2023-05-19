import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { ParkingLot } from './parking-lot';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit {
  public parkingLots!: ParkingLot[];
  showFlag: boolean = false;
  constructor(private http: HttpClient, private router: Router) { 
    this.showFlag = localStorage.getItem(environment.roleKey) == environment.role;
  }

  ngOnInit(): void {
    this.loadParkingLots();
  }

  loadParkingLots(): void {
    let url = environment.baseUrl + 'api/ParkingLots';
    this.http.get<ParkingLot[]>(url).subscribe(result => {
      this.parkingLots = result;
    });
  }

  deleteParkingLot(id: number): void {
    let url = environment.baseUrl + `api/ParkingLots/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Parking Lot ${id} was deleted successfully`);
        this.loadParkingLots();
      }
    });
  }
}
