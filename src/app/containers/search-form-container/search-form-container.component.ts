import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form-container',
  templateUrl: './search-form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormContainerComponent {
  constructor(private router: Router) {}

  public navigateToSearchPage(data: { search: string }) {
    this.router.navigate(['/searching-results'], {
      queryParams: { search: data.search }
    });
  }
}
