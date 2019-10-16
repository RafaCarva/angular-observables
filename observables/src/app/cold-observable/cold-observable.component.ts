import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observable',
  templateUrl: './cold-observable.component.html',
  styleUrls: ['./cold-observable.component.css']
})
export class ColdObservableComponent implements OnInit {

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

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {

        let i: number = 0 ;

        let id = setInterval( () => {
          i++;
          console.log('from Observable: ', i);
          if (i === 10) {observer.complete(); }
          else if (i % 2 === 0) {
            observer.next(i); // Esse 'i' é o que vai ser enviado para a 1º func do subscription.
          }
        }, 1000);
        return () => {
          clearInterval(id);
        };
      }
    );


    /**
     * A cada subscribe o observable vai "gerar uma fonte de dados"
     * por isso é "cold".
     */

    this.s1 = 'waiting for interval...';
    this.subscription1 = myIntervalObservable.subscribe(
      (num) => {this.n1 = num; }, // a 1ºfunc vai ficar recebendo o retorno do "observer.next(valor)"
      (error) => {this.s1 = 'Error: ' + error; }, // Se der erro chama a 2º func.
      () => {this.s1 = 'Completed'; } // a 3ª func acontece quando: observer.complete()
    );

    this.s2 = 'waiting for interval...';
    setInterval( () => {
      this.subscription2 = myIntervalObservable.subscribe(
        (num) => {this.n2 = num; },
        (error) => {this.s2 = 'Error: ' + error; },
        () => {this.s2 = 'Completed'; }
      );
    }, 3000);


    setTimeout(() => {
      this.subscription1.unsubscribe(); // unscrible encerra/congela a lógica em andamento
      this.subscription2.unsubscribe();
    }, 10000 );

  }

}
