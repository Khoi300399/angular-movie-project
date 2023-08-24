import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabPanelContentDirective } from '../../core/directives/tab-panel-content.directive';

@Component({
  selector: 'tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() iconClass!: string;
  @ViewChild(TemplateRef, { static: true }) implicitBody!: TemplateRef<unknown>;
  @ContentChild(TabPanelContentDirective, { static: true, read: TemplateRef })
  explicitBody!: TemplateRef<unknown>;
  constructor(private tabGroup: TabGroupComponent) {}

  get panelBody(): TemplateRef<unknown> {
    return this.explicitBody || this.implicitBody;
  }
  ngOnInit(): void {
    this.tabGroup.addTabPanel(this);
  }
  ngOnDestroy(): void {
    this.tabGroup.removeTabPanel(this);
  }
}
