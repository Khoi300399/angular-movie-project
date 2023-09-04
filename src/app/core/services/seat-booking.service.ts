import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DanhSachGhe } from '../store/ticket/ticket.model';
interface Combo {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class SeatBookingService {
  // ================= Combo ==========================
  isOpenCart: boolean = false;
  onOpentCart() {
    this.isOpenCart = true;
  }
  onClosetCart() {
    this.isOpenCart = false;
  }
  private comboList: Combo[] = [
    {
      id: 1,
      name: 'Bắp + Coca',
      image: '../../../assets/images/combo1.png',
      price: 75000,
      quantity: 0,
    },
    {
      id: 2,
      name: 'Bắp + 2 Coca',
      image: '../../../assets/images/combo2.png',
      price: 85000,
      quantity: 0,
    },
  ];
  private comboListSubject: BehaviorSubject<Combo[]> = new BehaviorSubject<
    Combo[]
  >(this.comboList);

  get comboList$(): Observable<Combo[]> {
    return this.comboListSubject.asObservable();
  }

  increaseQuantity(comboId: number): void {
    const comboToUpdate = this.comboList.find((combo) => combo.id === comboId);
    if (comboToUpdate) {
      comboToUpdate.quantity++;
      this.comboListSubject.next([...this.comboList]);
    }
  }

  decreaseQuantity(comboId: number): void {
    const comboToUpdate = this.comboList.find((combo) => combo.id === comboId);
    if (comboToUpdate && comboToUpdate.quantity > 0) {
      comboToUpdate.quantity--;
      this.comboListSubject.next([...this.comboList]);
    }
  }

  getComboPrice(): number {
    return this.comboList.reduce(
      (total, combo) => total + combo.price * combo.quantity,
      0
    );
  }
  isEmptyCombo(): boolean {
    return this.comboListSubject.getValue().length > 0;
  }
  // ================= Seats ==========================
  private selectedSeatsSubject: BehaviorSubject<DanhSachGhe[]> =
    new BehaviorSubject<DanhSachGhe[]>([]);

  constructor() {}

  selectSeat(seat: DanhSachGhe) {
    const currentSelectedSeats = this.selectedSeatsSubject.getValue();
    const updatedSelectedSeats = [...currentSelectedSeats, seat];
    this.selectedSeatsSubject.next(updatedSelectedSeats);
  }

  deleteSeat(seat: DanhSachGhe) {
    const currentSelectedSeats = [...this.selectedSeatsSubject.getValue()];
    const updatedSelectedSeats = currentSelectedSeats.filter(
      (s) => s.maGhe !== seat.maGhe
    );
    this.selectedSeatsSubject.next(updatedSelectedSeats);
  }

  getSelectedSeats(): DanhSachGhe[] {
    return [...this.selectedSeatsSubject.getValue()];
  }
  getSelectedSeatsSubmit(): { maGhe: number; giaVe: number }[] {
    let selectedSeatSubmit = this.selectedSeatsSubject.getValue();
    return selectedSeatSubmit.reduce(
      (acc, { maGhe, giaVe }) => [...acc, { maGhe, giaVe }],
      [] as { maGhe: number; giaVe: number }[]
    );
  }
  getTicketPrice(): number {
    const selectedSeats = this.selectedSeatsSubject.getValue();
    let total = selectedSeats.reduce(
      (accumulator, currentSeat) => accumulator + currentSeat.giaVe,
      0
    );
    return total;
  }

  clearSelectedSeats() {
    this.selectedSeatsSubject.next([]);
  }

  isSeatSelected(seat: DanhSachGhe): boolean {
    const selectedSeats = this.selectedSeatsSubject.getValue();

    return selectedSeats.some(
      (selectedSeat) => selectedSeat.maGhe === seat.maGhe
    );
  }
  isSelectSeatWithLimit(limitNumber: number): boolean {
    const length = this.selectedSeatsSubject.getValue().length;

    return length > limitNumber;
  }

  isSeatGapBlocked(): boolean {
    const selectedSeats = this.selectedSeatsSubject.getValue();
    const sortSelectedSeats = selectedSeats.sort((a, b) => a.maGhe - b.maGhe);
    for (let i = 0; i < selectedSeats.length - 1; i++) {
      const seatA = sortSelectedSeats[i];
      const seatB = sortSelectedSeats[i + 1];
      const seatC = sortSelectedSeats[i - 1];

      if (
        Math.abs(seatB.maGhe - seatA.maGhe) === 2 ||
        (seatC && Math.abs(seatC.maGhe - seatA.maGhe) === 2)
      ) {
        return true; // Có ghế cách nhau 2 đơn vị
      }
    }

    return false; // Không có ghế nào cách nhau 2 đơn vị
  }
  isEmptyTicket(): boolean {
    return this.selectedSeatsSubject.getValue().length <= 0;
  }
  // Total Price
  getTotalPrice(): number {
    let comboPrice = this.getComboPrice();
    let ticketPrice = this.getTicketPrice();
    return comboPrice + ticketPrice;
  }
}
