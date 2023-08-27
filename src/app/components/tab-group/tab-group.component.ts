import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';

@Component({
  selector: 'tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements AfterViewInit {
  tabPanelList: TabPanelComponent[] = [];
  @ViewChild('line', { static: true }) line!: ElementRef;
  @ViewChildren('tab') tabs!: QueryList<ElementRef<HTMLDivElement>>;
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();

  selectItem(idx: number) {
    this.activeIndexChange.emit(idx);
  }
  addTabPanel(tab: TabPanelComponent) {
    this.tabPanelList = [...this.tabPanelList, tab];
  }
  removeTabPanel(tab: TabPanelComponent) {
    let index = -1;
    this.tabPanelList = this.tabPanelList.filter((item, inx) => {
      if (tab === item) {
        index = inx;
        return false;
      }
      return true;
    });
    if (index !== -1) {
      this.selectItem(0);
    }
  }
  ngAfterViewInit(): void {
    this.updateLinePosition();
  }

  updateLinePosition() {
    // đặt left và width ban đầu cho dường line
    const activeTab = this.tabs.toArray()[this.activeIndex].nativeElement;
    const line = this.line.nativeElement;
    this.renderer.setStyle(line, 'width', `${activeTab.offsetWidth}px`);
    this.renderer.setStyle(line, 'left', `${activeTab.offsetLeft}px`);
    this.tabs.forEach((tab) => {
      tab.nativeElement.onclick = () => {
        const tabEle = tab.nativeElement;

        this.renderer.setStyle(line, 'width', `${tabEle.offsetWidth}px`);
        this.renderer.setStyle(line, 'left', `${tabEle.offsetLeft}px`);
      };
    });
  }
  constructor(private renderer: Renderer2) {}
}
