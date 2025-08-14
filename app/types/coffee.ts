export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  tag: string | null;
  category: "espresso" | "arabica";
}

export interface CartItem extends Coffee {
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
  createdAt: Date;
}
