import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';

    /*
    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error('6');
        observer.complete();
      }
    );
    myFirstObservable.subscribe(
      (n: number) => console.log(n),
      (error) => console.error(error),
      () => console.log('completed.')
    );
    */

    /*
    const timerCount = interval(500);
    timerCount.subscribe(
      (n) => console.log(n)
    )
    console.log('after interval');
    */

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {

        let i: number = 0 ;

        let id = setInterval( () => {
          i++;
          console.log('from Observable: ', i);
          if (i === 15) {observer.complete(); }
          else if (i % 2 === 0) {
            observer.next(i);// Esse 'i' é o que vai ser enviado para a 1º func do subscription.
          }
        }, 1000);
        return () => {
          clearInterval(id);
        };
      }
    );

    this.subscription1 = myIntervalObservable.subscribe(
      (num) => {this.n1 = num; }, // a 1ºfunc vai ficar recebendo o retorno do "observer.next(valor)"
      (error) => {this.s1 = 'Error: ' + error; }, // Se der erro chama a 2º func.
      () => {this.s1 = 'Completed'; } // a 3ª func acontece quando: observer.complete()
    );

    this.subscription2 = myIntervalObservable.subscribe(
      (num) => {this.n2 = num; },
      (error) => {this.s2 = 'Error: ' + error; },
      () => {this.s2 = 'Completed'}
    );

    setTimeout(() => {
      this.subscription1.unsubscribe(); // unscrible encerra/congela a lógica em andamento
      this.subscription2.unsubscribe();
    }, 10000 );

  }

}
