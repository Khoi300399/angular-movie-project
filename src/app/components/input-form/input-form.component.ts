import { Component, Input } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  @Input() control!: FormControl;
  @Input() name!: string;
  @Input() type!: string;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() password: boolean = false;
  @Input() required: boolean = false;
  isShowEye: boolean = false;
  onToggleShowEye() {
    this.isShowEye = !this.isShowEye;
    this.isShowEye ? (this.type = 'password') : (this.type = 'text');
    this.control.dirty;
  }
}
