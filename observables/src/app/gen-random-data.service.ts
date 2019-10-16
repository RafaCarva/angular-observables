import { publish } from 'rxjs/operators';
import { ConnectableObservable, Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataModel } from './data-model';

@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {

  // Esse é quem vai "dar subscribe"
  public dataObservable: ConnectableObservable<DataModel>;

  constructor() {
    this.dataObservable = new Observable(
      (observer: Observer<DataModel>) => {
        let n = 0;
        console.log('Observable created');

        // tslint:disable-next-line: no-unused-expression
        let f = () => {
          n++;
          console.log(n);
          if (n <= 10) {
            let timestamp = Math.round(Math.random() * 2000 + 500);
            // O retorno é um DataModel (veja: data-model.ts)
            observer.next({timestamp: timestamp, data: n});
            setTimeout(f, timestamp);
          }
          else {
            observer.complete();
          }
        };
        f();
      }
    ).pipe(publish()) as ConnectableObservable<DataModel>;
  }
}
