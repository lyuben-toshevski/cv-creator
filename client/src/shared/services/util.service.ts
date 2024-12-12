import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilService {
  static deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
