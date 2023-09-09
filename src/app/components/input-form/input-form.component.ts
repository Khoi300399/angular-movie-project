import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatchedControls } from '../../shared/validators/matched.validator';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() name!: string;
  @Input() type!: string;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() password!: boolean;
  isShowEye: boolean = false;
  ngOnInit(): void {
    this.password ? (this.type = 'password') : (this.type = 'text');
  }
  onToggleEye() {
    this.isShowEye = !this.isShowEye;
    this.isShowEye ? (this.type = 'text') : (this.type = 'password');
    this.control.setErrors;
  }
  isPasswordMatch(): boolean {
    if (this.control.parent instanceof FormGroup) {
      return this.control.parent.hasError('valueNoMatch');
    }
    return false;
  }
}
