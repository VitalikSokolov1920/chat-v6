import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: '[appIsHeightMore]'
})
export class IsHeightMoreDirective implements AfterViewInit{

  @Input()
  maxHeight = 450;

  @Output('appIsHeightMore')
  isMore = new EventEmitter<boolean>();

  constructor(private elem: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.elem.nativeElement.offsetHeight > this.maxHeight - 1) {
      this.isMore.emit(true);
    } else {
      this.isMore.emit(false);
    }
  }

}
