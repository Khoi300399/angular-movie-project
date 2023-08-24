import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  private isActiveSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActiveSubject.asObservable();

  private optionClickSubject = new BehaviorSubject<string>('');
  optionClick$ = this.optionClickSubject.asObservable();

  toggleDropdown(isActive: boolean) {
    this.isActiveSubject.next(isActive);
  }

  selectOption(option: string) {
    this.optionClickSubject.next(option);
  }

  onCloseDropdown() {
    this.isActiveSubject.next(false);
  }
}
