import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject, takeUntil} from "rxjs";
import {ErrorService} from "./error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  isShow = false;
  errorMessage: string;

  private unsubscribe$ = new ReplaySubject();

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.isShow.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.isShow = value.isShow;
      this.errorMessage = value.errorMessage;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);

    this.unsubscribe$.complete();
  }

}
