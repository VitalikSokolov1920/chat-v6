import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor() {}

  isShow = new BehaviorSubject<boolean>(false);

  public show() {
    this.isShow.next(true);
  }

  public hide() {
    const timeout = setTimeout(() => {
      this.isShow.next(false);

      clearTimeout(timeout);
    }, 400);
  }
}
