import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
export class LoadingPageComponent {
  isLoading!: boolean;
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading$().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
