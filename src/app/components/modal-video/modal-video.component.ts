import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface DialogData {
  link: string;
}
@Component({
  selector: 'modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.scss'],
})
export class ModalVideoComponent implements OnInit {
  safeVideoUrl!: SafeResourceUrl;
  ngOnInit(): void {
    this.checkLink(this.data.link);
  }

  checkLink(link: string) {
    let baseUrl: string = '';
    if (link && link.includes('https://www.youtube.com/embed/')) {
      baseUrl = link;
    } else if (link && link.includes('https://www.youtube.com/')) {
      baseUrl = 'https://www.youtube.com/embed/' + link.split('v=')[1];
    } else {
      baseUrl = 'https://www.youtube.com/embed/uqJ9u7GSaYM';
    }
    if (baseUrl) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${baseUrl}/?autoplay=1&mute=0&controls=0`
      );
    }
  }
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}
}
