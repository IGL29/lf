import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IReview } from './types';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent {
  @Input() comment: IReview['comment'];
  @Input() author: IReview['author'];
  @Input() createdAt: IReview['createdAt'];
  @Input() rating: IReview['rating'];
}
