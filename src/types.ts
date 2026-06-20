export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  description?: string;
  coverImage?: string;
  purchasePrice: number;
  rentPricePerDay: number;
  copiesForRent: number;
  availableForRent: number;
  stockForSale: number;
  isActive?: boolean;
}

export interface BookTransaction {
  _id: string;
  book: string;
  bookTitle: string;
  type: "rent" | "purchase";
  quantity: number;
  amount: number;
  rentDays?: number;
  rentStart?: string;
  rentDue?: string;
  returnedAt?: string | null;
  status: "rented" | "returned" | "purchased";
  reference: string;
  createdAt: string;
}

export interface SeatAvailability {
  _id: string;
  seatNumber: number;
  zone: string;
  available: boolean;
}

export interface Booking {
  _id: string;
  seat: string;
  seatNumber: number;
  date: string;
  startMinute: number;
  endMinute: number;
  status: "active" | "cancelled" | "completed";
  createdAt: string;
}

export interface SlotQuery {
  date: string;
  start: string;
  end: string;
}
