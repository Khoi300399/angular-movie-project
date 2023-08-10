import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
})
export class FormTemplateComponent implements OnInit {
  @Input() heading!: string;
  @Input() title!: string;
  @Input() sub!: string;
  @Input() link: string = '#!';
  @Input() grid: boolean = false;
  ngOnInit(): void {
    this.grid = this.grid;
  }
}
