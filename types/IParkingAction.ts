import { ParkingActionStatus } from "./IParkingActionStatus";

export interface IParkingAction {
  id: string;
  parkingSpaceId: string;
  parkingSpaceNumber: number;
  carId: string;
  carRegistrationPlate: string;
  status: ParkingActionStatus;
  parkTime: string;
  leaveTime: string;
}
