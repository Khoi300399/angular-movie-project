// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);

  constructor() {}

  startLoading() {
    this.isLoading.next(true);
  }

  stopLoading() {
    this.isLoading.next(false);
  }

  isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
