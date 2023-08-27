import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { Observable, takeUntil } from 'rxjs';
import { ThongTinLichChieuHeThongRapModel } from '../../core/store/cinema/cinema.model';
import { layThongTinLichChieuHeThongRap } from '../../core/store/cinema/cinema.actions';
import { thongTinLichChieuheThongRapSelector } from '../../core/store/cinema/cinema.selector';
import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
})
export class CinemasComponent implements OnInit, AfterViewInit {
  @ViewChildren('itemLogo') itemLogos!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChildren('itemMeta') itemMetas!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('lineLogo') lineLogo!: ElementRef<HTMLDivElement>;
  @ViewChild('lineMeta') lineMeta!: ElementRef<HTMLDivElement>;
  thongTinLichChieu$!: Observable<ThongTinLichChieuHeThongRapModel[]>;
  thongTinLichChieuActiveIndex: number = 0;
  thongTinCumRapActiveIndex: number = 0;

  ngOnInit(): void {
    this.store.dispatch(layThongTinLichChieuHeThongRap());
    this.thongTinLichChieu$ = this.store.pipe(
      select(thongTinLichChieuheThongRapSelector),
      takeUntil(this.destroy$)
    );
  }
  ngAfterViewInit(): void {
    this.itemLogos.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setLinePosition(this.lineLogo);
    });

    this.itemMetas.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setLinePosition(this.lineMeta);
    });
  }
  setLinePosition(lineElement: ElementRef<HTMLDivElement>) {
    const line = lineElement.nativeElement;
    this.renderer.setStyle(line, 'height', '90px');
    this.renderer.setStyle(line, 'top', `0`);
  }
  updateLinePosition(
    lineElement: ElementRef<HTMLDivElement>,
    itemElement: QueryList<ElementRef<HTMLLIElement>>
  ) {
    const line = lineElement.nativeElement;

    itemElement.forEach((item) => {
      item.nativeElement.onclick = () => {
        const tabEle = item.nativeElement;

        this.renderer.setStyle(line, 'height', `${tabEle.offsetHeight}px`);
        this.renderer.setStyle(line, 'top', `${tabEle.offsetTop}px`);
      };
    });
  }

  onClickLogo(index: number) {
    this.thongTinLichChieuActiveIndex = index;
    this.thongTinCumRapActiveIndex = 0;
    this.setLinePosition(this.lineMeta);
    this.updateLinePosition(this.lineLogo, this.itemLogos);
  }
  onClickMeta(index: number) {
    this.thongTinCumRapActiveIndex = index;
    this.updateLinePosition(this.lineMeta, this.itemMetas);
  }
  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private destroy$: DestroyService
  ) {}
}
