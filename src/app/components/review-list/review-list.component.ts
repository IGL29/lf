import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IReview } from '../review/types';
import { ErrorPayload } from '~types/apiPayloads';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewListComponent {
  @Input() reviews: IReview[];
  @Input() isLoading: boolean;
  @Input() error: ErrorPayload['error'] | null;
  @Output() emitRepeatRequestReviews: EventEmitter<void> = new EventEmitter();

  get isExistReviews(): boolean {
    return this.reviews?.length !== 0;
  }

  public repeatRequestComments(): void {
    this.emitRepeatRequestReviews.emit();
  }
}
