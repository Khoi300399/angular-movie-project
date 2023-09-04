import { Component } from '@angular/core';
import { SeatBookingService } from '../../core/services/seat-booking.service';

@Component({
  selector: 'cart-combo',
  templateUrl: './cart-combo.component.html',
  styleUrls: ['./cart-combo.component.scss'],
})
export class CartComboComponent {
  get comboList$() {
    return this.seatBookingService.comboList$;
  }

  increaseQuantity(comboId: number): void {
    this.seatBookingService.increaseQuantity(comboId);
    console.log('price', this.getTotalPrice());
  }

  decreaseQuantity(comboId: number): void {
    this.seatBookingService.decreaseQuantity(comboId);
    console.log('price', this.getTotalPrice());
  }

  getTotalPrice(): number {
    return this.seatBookingService.getComboPrice();
  }

  onClosetCart(): void {
    return this.seatBookingService.onClosetCart();
  }
  isOpenCart(): boolean {
    return this.seatBookingService.isOpenCart;
  }

  constructor(private seatBookingService: SeatBookingService) {}
}
