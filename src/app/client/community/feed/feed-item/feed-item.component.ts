import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../../../spinner/spinner.service";
import {FeedItem} from "../../../../_models/feed-item";

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {

  showMenu = true;

  showMoreBtn = false;
  showMoreCommentBtn = false;
  isShowAll = false;
  isShowAllComment = false;
  showMsgText: string = 'Показать полностью';
  showMsgCommentText = 'Показать полностью';

  feed: FeedItem = {
    image: 'assets/images/default-user-avatar.svg',
    id: '1',
    text: 'это большой большойбольшойбольшойбольшойбольшойбольшойбольшойбольшойбольшойбольшойбольшойбольшой текст A business idea is a concept that can be used for financial gain that is usually centered on a product or service that can be offered for\n' +
      'money. An idea is the first milestone in the process of building a successful business.',
    community_name: "Название сообщества",
    post_time: '2023-05-18 19:06',
    comment_count: '6'
  };

  constructor(private spinner: SpinnerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.spinner.hide();
  }

  isShowMoreBtn(res: boolean) {
    this.showMoreBtn = res;
    this.cdr.detectChanges();
  }

  isShowMoreCommentBtn(res: boolean) {
    this.showMoreCommentBtn = res;
    this.cdr.detectChanges();
  }

  onShowBtnClick() {
    if (!this.isShowAll) {
      this.showMsgText = 'Скрыть';
      this.isShowAll = true;
    } else {
      this.showMsgText = 'Показать полностью';
      this.isShowAll = false;
    }
  }

  onShowBtnCommentClick() {
    if (!this.isShowAllComment) {
      this.showMsgCommentText = 'Скрыть';
      this.isShowAllComment = true;
    } else {
      this.showMsgCommentText = 'Показать полностью';
      this.isShowAllComment = false;
    }
  }

}
