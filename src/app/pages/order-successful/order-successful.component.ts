import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { pageData } from '~pages/order-successful/data/pageData';
import { description } from './data/meta';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './order-successful.component.html',
  styleUrls: ['./order-successful.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSuccessfulComponent implements OnInit {
  public data = pageData;
  public orderId: number;

  constructor(private meta: Meta, private activatedRoute: ActivatedRoute) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.subscribeToRouteData();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }

  private subscribeToRouteData(): void {
    this.activatedRoute.data
      .pipe(map((data) => data[0]))
      .subscribe((orderId) => (this.orderId = Number(orderId)));
  }
}
