import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownService } from '../../core/services/dropdown.service';

@Component({
  selector: 'dropdown-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @Input() isActive: boolean = false;
  @Input() image: string = '';
  @Input() content: string = '';
  @Input() data!: any;
  @Output() optionClick = new EventEmitter<{
    data: any;
    selectedValue: string;
  }>();

  onClick() {
    this.optionClick.emit({
      data: this.data,
      selectedValue: this.content,
    });
    this.isActive = !this.isActive;
    this.dropdownService.onCloseDropdown();
  }
  constructor(private dropdownService: DropdownService) {}
}
