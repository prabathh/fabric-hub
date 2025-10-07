import { IconType } from "react-icons";
import { StaticImageData } from "next/image";

export interface Nav {
  id: string;
  label: string;
  route: string;
  icon: IconType;
}

export interface ItemDetail {
  id: string;
  image: StaticImageData;
  name: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  description: string;
}