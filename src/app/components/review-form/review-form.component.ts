import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewReview } from './types';
import { ErrorPayload } from '~types/apiPayloads';
import { empty } from 'src/app/validators/empty.validator';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewFormComponent implements OnInit {
  public isFormSubmitted = false;
  public reviewForm: FormGroup;
  private _reviewFormData: INewReview = {
    rating: null,
    comment: '',
    author: '',
    email: ''
  };

  @Input() isLoading = false;
  @Input() isReviewsLoading = false;
  @Input() error: ErrorPayload['error'] | null = null;
  @Input() isExistReviews = false;

  get reviewFormData(): INewReview {
    return this._reviewFormData;
  }
  @Input() set reviewFormData(formData: INewReview) {
    if (this.reviewForm) {
      this.reviewForm.setValue(formData);
      return;
    }
    this._reviewFormData = formData;
    this.setTouchedStateForm(false);
  }

  @Output() emitSubmitForm: EventEmitter<INewReview> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reviewForm = this.initReviewFormGroup();
  }

  private initReviewFormGroup() {
    return this.fb.group({
      rating: [this.reviewFormData.rating, [Validators.required]],
      comment: [this.reviewFormData.comment, [Validators.required, empty]],
      author: [this.reviewFormData.author, [Validators.required, empty]],
      email: [this.reviewFormData.email, [Validators.required, Validators.email]]
    });
  }

  public get commentControl() {
    return this.reviewForm.get('comment');
  }
  public get authorControl() {
    return this.reviewForm.get('author');
  }
  public get emailControl() {
    return this.reviewForm.get('email');
  }
  public get ratingControl() {
    return this.reviewForm.get('rating');
  }

  private setTouchedStateForm(isSubmitted: boolean) {
    this.isFormSubmitted = isSubmitted;
  }

  public resetForm(): void {
    this.reviewForm.reset();
    this.setTouchedStateForm(false);
  }

  public handlerSubmit(): void {
    this.setTouchedStateForm(true);
    if (this.reviewForm.invalid) {
      return;
    }
    this.emitSubmitForm.emit(this.reviewForm.value);
  }
}
