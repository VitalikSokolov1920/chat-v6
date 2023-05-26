import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Directive({
  selector: '[visible]'
})
export class VisibleDirective implements OnInit, OnDestroy{
  @Input()
  messageId: string;

  @Input()
  rootElemId: string;

  @Output("visible")
  emit: EventEmitter<string> = new EventEmitter();

  private observer : IntersectionObserver;

  constructor(private elemRef: ElementRef,
              @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    const elem = this.doc.getElementById(this.rootElemId);

    this.observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && entries[0].intersectionRatio == 1) {
        this.emit.emit(this.messageId);
      }
    }, {
      root: elem,
      threshold: 1
    });

    this.observer.observe(this.elemRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.elemRef.nativeElement);
  }
}
