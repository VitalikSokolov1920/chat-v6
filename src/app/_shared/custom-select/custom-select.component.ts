import {
  Component,
  EventEmitter, Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {DOCUMENT} from "@angular/common";

export class SelectItem {
  value: any;
  title: string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Input()
  items: SelectItem[];

  @Input()
  defaultItem: SelectItem = {
    title: 'Выбрать',
    value: null
  };

  @Input()
  showDefaultItem: boolean = true;

  @Input()
  showSelectedItem: boolean = true;

  @Output()
  selected = new EventEmitter<SelectItem>(true);

  @Output()
  closed = new EventEmitter(true);

  selectedItem: SelectItem;
  showItems = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.showDefaultItem) {
      this.selectedItem = this.defaultItem;
      this.selected.emit(this.selectedItem);
    }

    if (!this.showSelectedItem) {
      this.showItems = true;
    }
  }

  setSelectedItem(item: SelectItem) {
    this.showItems = false;

    this.selectedItem = item;

    this.selected.emit(this.selectedItem);
    this.closed.emit();
  }

  hideList() {
    this.showItems = false;

    this.closed.emit();
  }
}
