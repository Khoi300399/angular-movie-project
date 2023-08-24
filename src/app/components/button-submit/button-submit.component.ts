import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss'],
})
export class ButtonSubmitComponent {
  @Input() loading: boolean = false;
  @Input() formGroup!: FormGroup;
  @Input() ngClass!: string;
}
