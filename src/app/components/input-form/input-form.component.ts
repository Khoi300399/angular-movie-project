import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Input() password!: boolean;
  @Input() required: boolean = false;
  isShowEye: boolean = false;
  ngOnInit(): void {
    this.password ? (this.type = 'password') : (this.type = 'text');
  }
  onToggleEye() {
    this.isShowEye = !this.isShowEye;
    this.isShowEye ? (this.type = 'text') : (this.type = 'password');
  }
}
