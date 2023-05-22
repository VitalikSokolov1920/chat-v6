import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateCommunityService} from "./create-community.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {Image} from "../../../_models";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {

  communityGroup : FormGroup;

  image: SafeUrl;
  showImageError: boolean = false;
  communityNameError = false;
  communityCreateErrorMsg: string = null;

  constructor(private spinner: SpinnerService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private createCommunityService: CreateCommunityService) {}

  setCommunityImage(image: string | ArrayBuffer) {
    this.showImageError = false;
    this.communityGroup.controls['communityImage'].setValue(image as string);
    this.image = this.sanitizer.bypassSecurityTrustUrl(image as string);
  }

  setCommunityImageError(e: any) {
    this.showImageError = true;
  }

  ngOnInit(): void {
    this.spinner.hide();

    this.communityGroup = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      communityImage: this.fb.control('')
    });
  }

  checkCommunityName() {
    this.createCommunityService.checkCommunityName(this.communityGroup.controls['name'].value).pipe(take(1))
      .subscribe(result => {
        this.communityNameError = !result.actionResult;
        if (!result.actionResult) {
          this.communityGroup.setErrors({'invalid': true});
        }
      });
  }

  create() {
    const name = this.communityGroup.controls['name'].value;
    const desc = this.communityGroup.controls['description'].value;
    const image = this.communityGroup.controls['communityImage'].value;

    const paths = image.toString().split(';');

    const type = paths[0].slice(5);

    const data = paths[1].slice(7);

    const img: Image = {
      type,
      data,
    };

    this.createCommunityService.createCommunity(name, desc, img).pipe(take(1)).subscribe(res => {
      if (res.actionResult) {
        const communityId = res.result;

        this.router.navigate(['/client/community', communityId, 'feed']);
      } else {
        this.communityCreateErrorMsg = res.error;
      }
    });
  }

}
