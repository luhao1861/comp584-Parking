import { ParkingLot } from "../parking-lot/parking-lot";

  export class Car {
    constructor(
        public id: number,
        public licensePlate: string,
        public brand: string,
        public model: string,
        public year: number,
        public color: string,
        public parkingLotId: number,
        public parkingLot: {
          id: number;
          name: string;
          capacity: number;
          availableSpaces: number;
      }
    ) {}
  }