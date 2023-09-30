//@ts-ignore
import { Inject, Injectable } from '@angular/core';
import { WINDOW_TOKEN } from 'src/app/tokens/window';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class YmapsService {
  private ymaps: any;
  private maps: any;
  private map: any;

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public initMap(data: { lat: number; lon: number }[]) {
    return this.loadScriptMap(data).then(() => {
      return this.createMap(data);
    });
  }

  private loadScriptMap(data: { lat: number; lon: number }[]) {
    if (this.window.ymaps) {
      return Promise.resolve();
    }
    const scriptYmaps = this.document.createElement('script');
    scriptYmaps.src =
      'https://api-maps.yandex.ru/2.1/?apikey=50f8a21f-bac2-4553-bf58-f203bc76de68&lang=ru_RU';
    this.document.body.appendChild(scriptYmaps);

    return new Promise((resolve, reject) => {
      scriptYmaps.onload = () =>
        this.window.ymaps.ready(() => {
          resolve(true);
        });

      scriptYmaps.onerror = (err) => {
        reject(err);
      };
    });
  }

  private createMap(data: { lat: number; lon: number }[]) {
    if (!this.ymaps) {
      this.ymaps = this.window.ymaps;
    }
    return this.ymaps
      .load()
      .then((maps: any) => {
        this.maps = maps;
        this.map = new maps.Map('address-map', {
          center: [data[0].lat, data[0].lon],
          zoom: 16
        });
      })
      .catch((error: Error) => {
        throw (error.message = 'Failed to load Yandex Maps: ' + error.message);
      })
      .then(() => {
        this.setMarks(data);
        return this.map;
      });
  }

  private setMarks(data: { lat: number; lon: number }[]): void {
    const objectManager = new this.maps.ObjectManager();

    data.forEach((item: any, index: number) => {
      objectManager.add(this.getObject({ id: index, lat: item.lat, lon: item.lon }));
    });

    this.map.geoObjects.add(objectManager);
  }

  private getObject({ id, lat, lon }: { id: number; lat: number; lon: number }) {
    return {
      type: 'Feature',
      id: id,
      geometry: {
        type: 'Point',
        coordinates: [lat, lon]
      },
      properties: {
        hintContent: 'LoverFlower'
      }
    };
  }
}
