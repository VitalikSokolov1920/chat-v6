import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ErrorInfo} from "../_models/error-info";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  isShow = new BehaviorSubject<ErrorInfo>({isShow: false, errorMessage: ''});

  constructor() {}

  public show(errorMessage: string) {
    this.isShow.next({ isShow: true, errorMessage });

    const timeout = setTimeout(() => {
      this.isShow.next({isShow: false, errorMessage: ''});

      clearTimeout(timeout);
    }, 3000);
  }
}
