import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { YmapsService } from 'src/app/services/ymaps/ymaps.service';
import { pageData } from '~pages/contacts/data/data';
import { description } from './data/meta';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
  protected data = pageData;
  protected mapId = 'address-map';
  private _isLoading = false;
  private set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    this.cdr.markForCheck();
  }
  public get isLoading(): boolean {
    return this._isLoading;
  }
  private coordinatesShops: [{ lat: number; lon: number }] = [
    { lat: 53.925269070640965, lon: 27.508174499999964 }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private ymapsService: YmapsService,
    private meta: Meta
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.initMap();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }

  private async initMap() {
    this.isLoading = true;
    await this.ymapsService.initMap(this.coordinatesShops);
    this.isLoading = false;
  }
}
