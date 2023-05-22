import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[visible]'
})
export class VisibleDirective implements OnInit, OnDestroy{
  @Input()
  messageId: string;

  @Output("visible")
  emit: EventEmitter<string> = new EventEmitter();

  private observer : IntersectionObserver;

  constructor(private elemRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(() => {
      this.emit.emit(this.messageId);
    }, {
      threshold: 0.4
    });

    this.observer.observe(this.elemRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.elemRef.nativeElement);
  }
}
