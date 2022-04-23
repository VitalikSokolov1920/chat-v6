import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from "./spinner.service";
import {ReplaySubject, takeUntil} from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  isShow = false;

  private unsubscribe$ = new ReplaySubject();

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.isShow.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.isShow = value;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);

    this.unsubscribe$.complete();
  }
}
