import { StaticImageData } from "next/image";

export interface ShippingFormValues {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  image: StaticImageData;
  name: string;
  details: string;
  price: number;
  quantity: number;
  color: string;
}