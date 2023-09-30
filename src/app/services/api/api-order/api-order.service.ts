import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../http/http.service';
import { IOrderData } from '~pages/order/component/types';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  constructor(private http: HttpService) {}

  public postOrder(formData: IOrderData): Observable<{ id: string }> {
    return this.http.post(`${environment.api}/order`, formData);
  }
}
