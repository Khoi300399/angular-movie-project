import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'aplication',
  templateUrl: './aplication.component.html',
  styleUrls: ['./aplication.component.scss'],
})
export class AplicationComponent {
  slides: string[] = [
    '../../../assets/images/slide9.jpg',
    '../../../assets/images/slide10.jpg',
    '../../../assets/images/slide11.jpg',
    '../../../assets/images/slide12.jpg',
    '../../../assets/images/slide13.jpg',
  ];
  owlApplication: OwlOptions = {
    loop: true,
    items: 1,
    margin: 0,
    autoplayHoverPause: true,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: false,
    nav: false,
  };
}
