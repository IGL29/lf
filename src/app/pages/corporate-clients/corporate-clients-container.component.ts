import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CorporateClientsComponent } from './component/corporate-clients.component';
import { breadcrumbs } from './data/pageData';
import { ICorporateUser } from './component/types';
import { CorporateClientsService } from 'src/app/services/corporate/corporate-clients.service';
import { Subject, takeUntil } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { description } from './data/meta';

@Component({
  selector: 'app-corporate-clients-container',
  templateUrl: './corporate-clients-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorporateClientsContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  @ViewChild('corporateClientsComponent')
  corporateClientsComponent: CorporateClientsComponent;
  public breadcrumbs = breadcrumbs;
  public isLoading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private corporateClientsService: CorporateClientsService,
    private meta: Meta
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.subscribeToCorporateLoading();
    this.subscribeToResetForm();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }

  private subscribeToCorporateLoading() {
    this.corporateClientsService
      .getRequestLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cdr.markForCheck();
      });
  }

  private subscribeToResetForm(): void {
    this.corporateClientsService.clearFormStream
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        this.corporateClientsComponent.resetForm();
        this.cdr.markForCheck();
      });
  }

  public handlerSubmitForm(data: ICorporateUser) {
    this.corporateClientsService.submitForm(data);
  }
}
