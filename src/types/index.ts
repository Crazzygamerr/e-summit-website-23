import { Gender } from "@prisma/client";

type TravelItem = {
  destination: string;
  departureDateAndTime: string;
};

export type CheckoutObject = {
  isAccommodation: boolean;
  checkinDate?: Date;
  checkoutDate?: Date;
  travel: TravelItem[];
};

export enum Status {
  NOT_REG,
  PROCESSING,
  FAILED,
  APPROVED,
}
