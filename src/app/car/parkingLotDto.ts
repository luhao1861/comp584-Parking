import { Car } from "./car";

  export class ParkingLotDto {
    constructor(
        public id: number,
        public name: string,
        public Car: Car[]
    ) {}
  }