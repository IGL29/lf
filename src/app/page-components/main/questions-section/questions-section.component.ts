import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pageData } from '~pages/main/data/pageData';

@Component({
  selector: 'app-questions-section',
  templateUrl: './questions-section.component.html',
  styleUrls: ['./questions-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsSectionComponent {
  public data = pageData.questions;
}
