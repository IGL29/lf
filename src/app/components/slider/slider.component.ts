import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SlideComponent } from '~components/slide/slide.component';

export type TOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild('containerRef', { read: 'containerRef' })
  containerRef: ViewContainerRef;
  @ContentChildren(SlideComponent, { read: ElementRef })
  slidesQueryList: QueryList<ElementRef>;
  @ViewChild('slider') sliderElRef: ElementRef;
  @ViewChild('wrapper') wrapperElRef: ElementRef;

  protected _orientation: TOrientation = 'horizontal';
  @Input() public set orientation(orientation: TOrientation) {
    this._orientation = orientation;

    if (!this.sliderElRef) {
      return;
    }
    this.cdr.markForCheck();

    this.sliderWidth = parseFloat(getComputedStyle(this.sliderElRef.nativeElement).width);
    this.sliderHeight = parseFloat(getComputedStyle(this.sliderElRef.nativeElement).height);

    this.calculateSizeSlides(this.sliderWidth, this.sliderHeight);
  }

  private _countVisibleSlides = 2;
  @Input() public set countVisibleSlides(count: number) {
    this._countVisibleSlides = count;

    if (!this.sliderElRef) {
      return;
    }
    this.sliderHeight = parseFloat(getComputedStyle(this.sliderElRef.nativeElement).height);
    this.sliderWidth = parseFloat(getComputedStyle(this.sliderElRef.nativeElement).width);
    this.calculateSizeSlides(this.sliderWidth, this.sliderHeight);
  }
  @Input() public step = 2;
  @Input() public animateDuration = 0.3;
  @Input() public set spaceBetweenSlides(value: number) {
    this._spaceBetweenSlides = Math.ceil(value / 2);
  }
  public get spaceBetweenSlides() {
    return this._spaceBetweenSlides;
  }

  private destroySubject: Subject<null> = new Subject();
  private sliderHeight = 0;
  private sliderWidth = 0;
  private _spaceBetweenSlides = 15;
  private _stepSlideToPx = 0;
  private _activeIndexStepSlides = 0;
  private _slideWidth = 0;
  private _slideHeight = 0;
  private _offsetSlidesCurrent = 0;
  private countSlides: number;
  private indexLastStepSlides = 0;
  private maxCountStepSlides = 0;
  private resizeObserver$: ResizeObserver;
  private stepRatio = 0.3;
  private stepRatioToPx = 0;
  private _isDraggable = false;
  private isDraggableForMouse = false;
  private pointerInitialPosition = 0;
  private pointerOffset = 0;
  protected isVisibleContent = false;
  protected offsetSlidesBeforeMoving = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.isHorizontalOrientation) {
      this.isVisibleContent = true;
    }
    this.resizeObserver$ = new ResizeObserver((entries) => {
      this.calculateSizeSlides(entries[0].contentRect.width, entries[0].contentRect.height);
    });
  }

  ngAfterContentInit(): void {
    this.slidesQueryList.changes.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      this.calcBasedNumberSlides();
      this.saveSliderSizes();
      this.calculateSizeSlides(this.sliderWidth, this.sliderHeight);
    });
    this.calcBasedNumberSlides();
  }

  ngAfterViewInit(): void {
    this.saveSliderSizes();
    this.setHandlerPreventClick();
    this.calculateSizeSlides(this.sliderWidth, this.sliderHeight);
    this.resizeObserver$.observe(this.sliderElRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver$) {
      this.resizeObserver$.disconnect();
    }
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private setHandlerPreventClick(): void {
    this.sliderElRef.nativeElement.addEventListener(
      'click',
      (ev: MouseEvent) => this.preventClickEvent(ev),
      { capture: true }
    );
  }

  private calculateSizeSlides(sliderRootWidth: number, sliderRootHeight: number): void {
    this.isVisibleContent = false;
    if (this.isHorizontalOrientation) {
      this.setFixedHeghtToSlider(null);
      this.calculateWidthSlides(sliderRootWidth);
      this.wrapperElRef.nativeElement.style.flexDirection = 'row';
      this.isVisibleContent = true;
      this.cdr.markForCheck();
      return;
    }
    this.setFixedHeghtToSlider(this.sliderHeight);
    this.calculateHeightSlides(sliderRootHeight);
    this.wrapperElRef.nativeElement.style.flexDirection = 'column';
    this.isVisibleContent = true;
    this.cdr.markForCheck();
  }

  private calcBasedNumberSlides(): void {
    this.countSlides = this.slidesQueryList.length;
    this.maxCountStepSlides = Math.ceil(this.countSlides / this.step);
    this.indexLastStepSlides = this.maxCountStepSlides - 1;
  }

  private saveSliderSizes(): void {
    const { width, height } = getComputedStyle(this.sliderElRef.nativeElement);
    this.sliderHeight = parseFloat(width);
    this.sliderWidth = parseFloat(height);
  }

  private set slideWidth(width: number) {
    this._slideWidth = width;
    this.stepSlideToPx = this.slideWidth * this.step + this.spaceBetweenSlides * 2 * this.step;
    this.stepRatioToPx = this.stepSlideToPx * this.stepRatio;
    this.setWidthToSlides();
  }

  private get slideWidth() {
    return this._slideWidth;
  }

  public get isDraggable(): boolean {
    return this._isDraggable;
  }

  private set slideHeight(height: number) {
    this._slideHeight = height;
    this.stepSlideToPx = this.slideHeight * this.step + this.spaceBetweenSlides * 2 * this.step;
    this.stepRatioToPx = this.stepSlideToPx * this.stepRatio;
    this.setHeightToSlides();
  }

  private get slideHeight() {
    return this._slideHeight;
  }

  private setHorizontalSpaceToSlide(slide: HTMLElement, isReset?: boolean): void {
    slide.style.marginLeft = isReset ? '' : `${this.spaceBetweenSlides}px`;
    slide.style.marginRight = isReset ? '' : `${this.spaceBetweenSlides}px`;
  }

  private setVerticalSpaceToSlide(slide: HTMLElement, isReset?: boolean): void {
    slide.style.marginTop = isReset ? '' : `${this.spaceBetweenSlides}px`;
    slide.style.marginBottom = isReset ? '' : `${this.spaceBetweenSlides}px`;
  }

  private setWidthToSlides(): void {
    this.slidesQueryList.forEach((slideElRef) => {
      slideElRef.nativeElement.style.width = `${this.slideWidth}px`;
      slideElRef.nativeElement.style.height = '';
      this.setHorizontalSpaceToSlide(slideElRef.nativeElement);
      this.setVerticalSpaceToSlide(slideElRef.nativeElement, true);
    });
  }

  private setHeightToSlides(): void {
    this.slidesQueryList.forEach((slideElRef) => {
      slideElRef.nativeElement.style.height = `${this.slideHeight}px`;
      slideElRef.nativeElement.style.width = '';
      this.setVerticalSpaceToSlide(slideElRef.nativeElement);
      this.setHorizontalSpaceToSlide(slideElRef.nativeElement, true);
    });
  }

  private setFixedHeghtToSlider(sliderHeight: number | null): void {
    this.sliderElRef.nativeElement.style.height = sliderHeight === null ? '' : `${sliderHeight}px`;
  }

  private set stepSlideToPx(value: number) {
    this._stepSlideToPx = value;
    this.offsetSlidesCurrent = -(this.activeIndexStepSlides * value);
  }

  private get stepSlideToPx(): number {
    return this._stepSlideToPx;
  }

  private set offsetSlidesCurrent(value: number) {
    this._offsetSlidesCurrent = value;
  }

  protected get offsetSlidesCurrent(): number {
    return this._offsetSlidesCurrent;
  }

  private set activeIndexStepSlides(indexGuessStepSlides: number) {
    if (indexGuessStepSlides === 0) {
      this._activeIndexStepSlides = 0;
      this.offsetSlidesCurrent = 0;
      return;
    }
    if (indexGuessStepSlides < 0) {
      this._activeIndexStepSlides = this.indexLastStepSlides;
      this.offsetSlidesCurrent = -(this.indexLastStepSlides * this.stepSlideToPx);
      return;
    }
    if (indexGuessStepSlides > this.indexLastStepSlides) {
      this._activeIndexStepSlides = 0;
      this.offsetSlidesCurrent = 0;
      return;
    }
    this._activeIndexStepSlides = indexGuessStepSlides;
    this.offsetSlidesCurrent = -(indexGuessStepSlides * this.stepSlideToPx);
  }

  private get activeIndexStepSlides(): number {
    return this._activeIndexStepSlides;
  }

  private setActiveSlideAfterOffset(): void {
    const interimCalc = -this.offsetSlidesCurrent / this.stepSlideToPx;
    const guessIndexStepSlide =
      this.pointerOffset < 0 ? Math.ceil(interimCalc) : Math.floor(interimCalc);

    this.activeIndexStepSlides = guessIndexStepSlide;
  }

  private calculateWidthSlides(sliderWrapperWidth: number): void {
    this.slideWidth = sliderWrapperWidth / this._countVisibleSlides - this.spaceBetweenSlides * 2;
  }

  private calculateHeightSlides(sliderWrapperHeight: number): void {
    this.slideHeight = sliderWrapperHeight / this._countVisibleSlides - this.spaceBetweenSlides * 2;
  }

  protected get isVerticalOrientation(): boolean {
    return this._orientation === 'vertical';
  }

  protected get isHorizontalOrientation(): boolean {
    return !this.isVerticalOrientation;
  }

  protected handlerPointerDown(ev: PointerEvent): void {
    ev.preventDefault();

    if (!ev.currentTarget) {
      return;
    }

    this._isDraggable = true;
    this.pointerInitialPosition = this.getPointerPosition(ev);
    this.offsetSlidesBeforeMoving = this.offsetSlidesCurrent;
  }

  private getPointerPosition(ev: PointerEvent): number {
    if (this.isHorizontalOrientation) {
      return ev.clientX - (<HTMLElement>ev.currentTarget).offsetLeft;
    } else {
      return ev.clientY - (<HTMLElement>ev.currentTarget).offsetTop;
    }
  }

  protected handlerPointerMove(ev: PointerEvent): void {
    ev.preventDefault();

    if (!this._isDraggable) {
      return;
    }

    if (!this.isDraggableForMouse && ev.pointerType === 'mouse') {
      this.isDraggableForMouse = true;
    }

    this.pointerOffset = this.getPointerPosition(ev) - this.pointerInitialPosition;
    this.animateDuration = 0;
    this.offsetSlidesCurrent = this.offsetSlidesBeforeMoving + this.pointerOffset;

    if (Math.abs(this.pointerOffset) >= this.stepRatioToPx) {
      this.handlerPointerUp();
    }
  }

  protected handlerPointerUp(): void {
    if (this._isDraggable) {
      this._isDraggable = false;
    } else {
      return;
    }

    this.animateDuration = 0.3;
    this.offsetSlidesBeforeMoving = this.offsetSlidesCurrent;

    this.setActiveSlideAfterOffset();
    this.pointerOffset = 0;
  }

  protected preventClickEvent(event: MouseEvent) {
    if (this.isDraggableForMouse) {
      this.isDraggableForMouse = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  public prevStep(): void {
    this.activeIndexStepSlides = this.activeIndexStepSlides - 1;
    this.cdr.markForCheck();
  }

  public nextStep(): void {
    this.activeIndexStepSlides = this.activeIndexStepSlides + 1;
    this.cdr.markForCheck();
  }
}
