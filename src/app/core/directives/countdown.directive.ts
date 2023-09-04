import {
  Directive,
  OnDestroy,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Directive({
  selector: '[countdown]',
})
export class CountdownDirective implements OnInit, OnDestroy {
  @Output() countdown = new EventEmitter<void>();

  private targetTime!: number;
  private subscription!: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const timeEnd = this.el.nativeElement.innerText;
    this.targetTime = this.parseTime(timeEnd);
    this.startCountdown();
  }

  private parseTime(timeString: string): number {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return new Date().getTime() + (minutes * 60 + seconds) * 1000;
  }

  private startCountdown() {
    this.subscription = interval(1000).subscribe(() => {
      const currentTime = new Date().getTime();
      const timeLeft = Math.max(this.targetTime - currentTime, 0);

      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);

      const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        formattedTime
      );

      if (timeLeft === 0) {
        this.subscription.unsubscribe();
        this.countdown.emit();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
