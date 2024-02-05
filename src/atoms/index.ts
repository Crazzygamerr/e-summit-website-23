import { atom, useAtom } from "jotai";
import { CheckoutObject } from "../types";

type CheckoutState = CheckoutObject & { aadharCardNumber: string };

export const initialCheckoutState: CheckoutState = {
  aadharCardNumber: "",
  isAccommodation: false,
  checkinDate: new Date("Jan 28, 2023 00:00:00"),
  checkoutDate: new Date("Jan 29, 2023 00:00:00"),
  travel: [],
};

export const checkoutAtom = atom<CheckoutState>(initialCheckoutState);

export const showTicketAtom = atom<boolean>(false);

export const showMemberModalAtom = atom<boolean>(false);
