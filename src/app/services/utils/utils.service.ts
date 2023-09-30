import { Injectable } from '@angular/core';
import { deepClone } from 'src/utils/deepClone';
import { generateRandomString } from 'src/utils/randomString';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public generateRandomString = generateRandomString;
  public deepClone = deepClone;
}
