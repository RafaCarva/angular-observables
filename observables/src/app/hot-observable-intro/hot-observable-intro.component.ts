import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Observer, interval, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-hot-observable-intro',
  templateUrl: './hot-observable-intro.component.html',
  styleUrls: ['./hot-observable-intro.component.css']
})
export class HotObservableIntroComponent implements OnInit {

  @ViewChild('myButton', {static: true}) varButton: ElementRef;

  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.varButton.nativeElement, 'click' );

    myBtnClickObservable.subscribe( (event) => console.log('button clicked 1') );
    myBtnClickObservable.subscribe( (event) => console.log('button clicked 2') );


    class Producer {
      private myListners = [];
      private n = 0;
      private id;

      addListener(l) {
        this.myListners.push(l);
        console.log(this.myListners.length);
      }

      start() {
        this.id = setInterval( () => {
          this.n++;
          console.log('From Producer: ' + this.n);

          for (let l of this.myListners) {
            l(this.n);
          }

        }, 1000);
      }
      stop() {
        clearInterval(this.id);
      }
  } // class

    const producer: Producer = new Producer();
    producer.start();

    setTimeout(
      () => {
      producer.addListener((n) => console.log('From listener 1', n));
      producer.addListener((n) => console.log('From listener 2', n));
    }, 4000);

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener((n) => observer.next(n));
      }
    );

    myHotObservable.subscribe((n) => console.log('From Subscriber 1', n));

}
}
