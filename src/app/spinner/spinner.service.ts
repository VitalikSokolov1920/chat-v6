import {forwardRef, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {SpinnerModule} from "./spinner.module";

@Injectable({
  providedIn: forwardRef(() => SpinnerModule)
})
export class SpinnerService {
  constructor() {}

  isShow = new BehaviorSubject<boolean>(false);

  public show() {
    this.isShow.next(true);
  }

  public hide() {
    this.isShow.next(false);
  }
}
