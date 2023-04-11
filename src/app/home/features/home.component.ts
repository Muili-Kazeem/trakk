import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild("body") body!: ElementRef;
  @ViewChild("main") main!: ElementRef;
  @ViewChild("intro") intro!: ElementRef;
  @ViewChildren("card") card!: QueryList<ElementRef>;
  @ViewChild("features") features!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    // this.card.forEach(card => {
    //   gsap.set(card.nativeElement, { position: 'absolute' })
    // })

    // gsap.to(".section", {
    //   yPercent: -150, stagger: 0.5,
    //   scrollTrigger: {
    //     trigger: this.features.nativeElement,
    //     markers: true,
    //     start: "top top",
    //     end: "+=2000px",
    //     scrub: true,
    //     pin: true,
    //   }
    // })
  }

  ngOnInit(): void {
  }

  expose() {
    this.body.nativeElement.classList.toggle("full_screen");
    gsap.to(this.intro.nativeElement, {
      yPercent: -100,
      duration: 2
    })
  }

}
