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
import {ReplaySubject} from "rxjs";

@Directive({
  selector: '[close-on]'
})
export class CloseOnEventDirective implements OnInit, OnDestroy{

  @Input('close-on')
  event: string = 'click';

  @Output()
  emit = new EventEmitter<Event>();

  private unsubscribe$ = new ReplaySubject();

  constructor(private elemRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();

    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.emit.emit(event);
    }
  }

  ngOnInit() {
    // fromEvent(this.document, this.event).pipe(
    //   takeUntil(this.unsubscribe$)
    // ).subscribe(event => {
    //   if (this.prepareToClose) {
    //     this.emit.emit(event);
    //     this.prepareToClose = false;
    //   }
    // });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);

    this.unsubscribe$.complete();
  }

}
