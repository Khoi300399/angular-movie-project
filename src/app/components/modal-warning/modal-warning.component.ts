import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DanhSachGhe } from '../../core/store/ticket/ticket.model';
export interface DialogData {
  button: string;
  notification: string;
  seat: DanhSachGhe;
}
@Component({
  selector: 'modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.scss'],
})
export class ModalWarningComponent implements OnInit {
  button!: string;
  notification!: string;
  ngOnInit(): void {
    this.button = this.data.button;
    this.notification = this.data.notification;
  }
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}
}
