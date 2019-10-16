import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {

  n:  number = 0;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  myObservable: Observable<number>;

constructor() { }

ngOnInit() {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let i : number = 0;
        console.log('%c Observable Created ',
          'background: #000000; color: #FFF633'
        );

        setInterval( () => {
          i++;
          console.log('i: ' + i);
          (i === 100) ? observer.complete() : observer.next(i);
        }, 1000);
      }
    );
    this.usingSubjects();
  }

  usingSubjects() {
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);

    // subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'OK';
      })
    }, 2000);

    // subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'OK';
      })
    }, 4000);


  }

}
