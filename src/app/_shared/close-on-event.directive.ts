import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {fromEvent, ReplaySubject, takeUntil} from "rxjs";

@Directive({
  selector: '[close-on]'
})
export class CloseOnEventDirective implements OnInit, OnDestroy{

  @Input('close-on')
  event: string = 'click';

  @Output()
  emit = new EventEmitter<Event>();

  private unsubscribe$ = new ReplaySubject();
  private prepareToClose = false;

  constructor(private elemRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {}

  @HostListener('mouseleave')
  onMouseLeave() {
    this.prepareToClose = true;
  }

  @HostListener('mouseenter')
  onMouseOver() {
    this.prepareToClose = false;
  }

  ngOnInit() {
    fromEvent(this.document, this.event).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(event => {
      if (this.prepareToClose) {
        this.emit.emit(event);
        this.prepareToClose = false;
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);

    this.unsubscribe$.complete();
  }

}
