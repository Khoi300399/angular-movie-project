import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss'],
})
export class ButtonSubmitComponent implements OnChanges {
  @Input() loading?: Observable<boolean>;
  @Input() formGroup!: FormGroup;
  @Input() ngClass!: string;
  isLoading: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if ('loading' in changes) {
      const newLoading = changes['loading'].currentValue;

      if (newLoading instanceof Observable) {
        newLoading.subscribe((loading) => {
          this.isLoading = loading;
        });
      } else {
        this.isLoading = !!newLoading;
      }
    }
  }
}
