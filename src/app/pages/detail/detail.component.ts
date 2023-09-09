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
import { Observable, map, takeUntil, tap } from 'rxjs';
import { ThongTinLichChieuPhimModel } from '../../core/store/cinema/cinema.model';
import { layThongTinLichChieuPhim } from '../../core/store/cinema/cinema.actions';
import {
  lichChieuPhimSelector,
  lichChieuPhimStatusSelector,
} from '../../core/store/cinema/cinema.selector';
import { DestroyService } from '../../core/services/destroy.service';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { ModalVideoComponent } from '../../components/modal-video/modal-video.component';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, AfterViewInit {
  @ViewChildren('itemLogo') itemLogos!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChildren('itemMeta') itemMetas!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('lineLogo') lineLogo!: ElementRef<HTMLDivElement>;
  @ViewChild('lineMeta') lineMeta!: ElementRef<HTMLDivElement>;
  lichChieuPhim$!: Observable<ThongTinLichChieuPhimModel | null>;
  heThongRapChieuActiveIndex: number = 0;
  cumRapChieuActiveIndex: number = 0;
  loading$: Observable<boolean> = this.store.pipe(
    select(lichChieuPhimStatusSelector),
    map((status) => status === 'loading')
  );

  ngOnInit(): void {
    this.scrollToTop();

    this.route.queryParams
      .pipe(
        tap((params) => {
          const maPhim = +params['maPhim'];
          this.store.dispatch(layThongTinLichChieuPhim({ maPhim }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.lichChieuPhim$ = this.store.pipe(
      select(lichChieuPhimSelector),
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
    this.heThongRapChieuActiveIndex = index;
    this.cumRapChieuActiveIndex = 0;
    this.setLinePosition(this.lineMeta);
    this.updateLinePosition(this.lineLogo, this.itemLogos);
  }
  onClickMeta(index: number) {
    this.cumRapChieuActiveIndex = index;
    this.updateLinePosition(this.lineMeta, this.itemMetas);
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  onDialogVideo(link: string) {
    this.dialog.open<string>(ModalVideoComponent, {
      data: { link },
    });
  }
  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private destroy$: DestroyService,
    private route: ActivatedRoute,
    public dialog: Dialog
  ) {}
}
