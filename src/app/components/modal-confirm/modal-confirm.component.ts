import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
interface DialogData {
  kind: string;
  title: string;
  message: string;
  titleConfirm: string;
  titleCancel: string;
}
@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  modalData!: DialogData;
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit(): void {
    this.modalData = this.data;
  }
}
