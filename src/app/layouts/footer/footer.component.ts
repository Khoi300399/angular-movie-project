import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  logoList: { link: string; image: string }[] = [
    {
      link: 'https://www.cgv.vn/',
      image: '../../../assets/images/logo-cgv.png',
    },
    {
      link: 'https://www.bhdstar.vn/',
      image: '../../../assets/images/logo-bhd.png',
    },
    {
      link: 'https://www.galaxycine.vn/',
      image: '../../../assets/images/logo-glx.png',
    },
    {
      link: 'http://cinestar.com.vn/',
      image: '../../../assets/images/logo-cinestar.png',
    },
    {
      link: 'http://lottecinemavn.com/LCHS/index.aspx',
      image: '../../../assets/images/logo-lotte.png',
    },
    {
      link: 'https://www.megagscinemas.vn/',
      image: '../../../assets/images/logo-mega.png',
    },
    {
      link: 'https://www.betacinemas.vn/home.htm',
      image: '../../../assets/images/logo-beta.jpg',
    },
    {
      link: 'http://ddcinema.vn/',
      image: '../../../assets/images/logo-ddc.png',
    },
    {
      link: 'https://touchcinema.com/',
      image: '../../../assets/images/logo-touch.png',
    },
    {
      link: 'https://cinemaxvn.com/',
      image: '../../../assets/images/logo-cinemax.jpg',
    },
    {
      link: 'https://starlight.vn/',
      image: '../../../assets/images/logo-starlight.png',
    },
    {
      link: 'https://www.dcine.vn/',
      image: '../../../assets/images/logo-dcine.png',
    },
    {
      link: 'https://zalopay.vn/',
      image: '../../../assets/images/logo-zalo.png',
    },
    {
      link: 'https://www.payoo.vn/',
      image: '../../../assets/images/logo-payoo.png',
    },
    {
      link: 'https://www.vietcombank.com.vn/',
      image: '../../../assets/images/logo-vietcombank.png',
    },
    {
      link: 'https://www.agribank.com.vn/',
      image: '../../../assets/images/logo-agribank.png',
    },
  ];
}
