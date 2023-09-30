import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '~types/product';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  constructor(private http: HttpService) {}

  private url = environment.api;

  public getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/products`);
  }

  public getProduct(id: IProduct['id']): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/product/${id}`);
  }
}
