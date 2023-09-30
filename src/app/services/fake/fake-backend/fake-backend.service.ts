import { Injectable } from '@angular/core';
import { Observable, from, of, throwError, timer, toArray } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { products } from 'src/data/fakeBackendData/products';
import { IProduct } from '~types/product';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {
  public get(url: string) {
    if (url.includes('/products')) {
      return this.getProducts();
    }
    if (url.includes('/product')) {
      const id = url.match(/\d+/)?.[0];
      return id
        ? this.getProduct(Number(id))
        : throwError(() => ({
            error: 'Not found'
          }));
    }

    if (url.includes('/comments')) {
      return this.getComments();
    }

    return throwError(() => ({
      error: 'Error'
    }));
  }

  public post(url: string, data: any) {
    if (url.includes('/order')) {
      return this.postOrder();
    }
    if (url.includes('/corporate')) {
      return this.postRequestCorporate();
    }
    if (url.includes('/feedback')) {
      return this.postFeedback();
    }
    if (url.includes('/comment')) {
      return this.postComment();
    }

    return throwError(() => ({
      error: 'Error'
    }));
  }

  private getProducts(): Observable<IProduct[]> {
    return from(products).pipe(toArray());
  }
  private postOrder(isResponseSuccess = true): Observable<{ id: string } | Error> {
    return timer(4000).pipe(
      switchMap(() =>
        of(isResponseSuccess).pipe(
          map((value) => (value ? { id: '234234234' } : Error('Payment error')))
        )
      )
    );
  }
  private postRequestCorporate(): Observable<{ data: 'success' }> {
    return timer(4000).pipe(map(() => ({ data: 'success' })));
  }
  private postFeedback(): Observable<{ data: 'success' }> {
    return timer(4000).pipe(map(() => ({ data: 'success' })));
  }
  private postComment(): Observable<{ data: 'success' }> {
    return timer(4000).pipe(map(() => ({ data: 'success' })));
  }
  private getProduct(id: number): Observable<any> {
    return from(products).pipe(first((product) => Number(product.id) === Number(id)));
  }
  private getComments() {
    return timer(4000).pipe(map(() => this.comments));
  }

  comments = [
    {
      author: 'Анна',
      comment: 'Лучшая доставка цветов в городе!',
      date: new Date('04.16.2023'),
      rating: 5
    },
    {
      author: 'Василий',
      comment: `Лучшая доставка цветов в городе! Быстро доставили, привезли к нужному
      времени, а сам букет превзошел все ожидания!`,
      date: new Date('04.16.2023'),
      rating: 5
    },
    {
      author: 'Дмитрий',
      comment: 'Лучшая доставка цветов в городе!',
      date: new Date('04.16.2023'),
      rating: 4
    }
  ];
}
