import {forwardRef, Injectable} from '@angular/core';
import {CommunityModule} from "../community.module";
import {HttpClient} from "@angular/common/http";
import {ActionResult, Image} from "../../../_models";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: forwardRef(() => CommunityModule)
})
export class CreateCommunityService {

  constructor(private http: HttpClient) {}

  checkCommunityName(name: string) {
    const params = {
      name
    };
    return this.http.get<ActionResult<boolean>>(`${environment.apiUrl}/check-community-name`, {params});
  }

  createCommunity(name: string, description: string, image: Image) {
    const params = {
      name,
      description,
      image
    };

    return this.http.post<ActionResult<string>>(`${environment.apiUrl}/create-community`, {...params});
  }
}
