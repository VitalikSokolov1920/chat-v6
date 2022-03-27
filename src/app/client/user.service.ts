import {forwardRef, Injectable} from "@angular/core";
import {ClientModule} from "./client.module";

@Injectable({
  providedIn: forwardRef(() => ClientModule)
})
export class UserService {
  constructor() {
  }
}
