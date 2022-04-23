import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-image-picker',
  templateUrl: './custom-image-picker.component.html',
  styleUrls: ['./custom-image-picker.component.scss']
})
export class CustomImagePickerComponent implements OnInit {

  @Output()
  success = new EventEmitter<string | ArrayBuffer>();
  @Output()
  error = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  fileChanged(info: any) {
    const file = info.target.files[0];

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = (result) => {
      this.success.emit(result.target.result);
    };

    fileReader.onerror = (e) => {
      this.error.emit(e);
    };
  }
}
