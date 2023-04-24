import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { faEnvelope, faRocket } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DateTime } from 'luxon';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home_features&footer.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  rocket = faRocket;
  letter = faEnvelope;
  github = faGithub;
  linkedIn = faLinkedin;
  twitter = faTwitter;

  year: string = DateTime.local().year;

  @ViewChildren("hr") hr!: QueryList<ElementRef>;
  @ViewChild("main") main!: ElementRef;
  @ViewChild("intro") intro!: ElementRef;
  @ViewChild("nav") nav!: ElementRef;
  @ViewChild("hero_header") hero_header!: ElementRef;
  @ViewChildren("card") cards!: QueryList<ElementRef>;
  @ViewChild("features") features!: ElementRef;
  @ViewChild("compass_navigator") compass!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.animateMainPage();
    this.entryAnimation();
    this.ruleHr();
  }

  ngOnInit(): void {
  }

  expose() {
    gsap.to(this.intro.nativeElement, {
      yPercent: -100,
      duration: 2
    });
  }

  entryAnimation() {
    const tl = gsap.timeline();

    // tl.from(this.nav.nativeElement, {
    //   y: -200,
    //   ease: "sine.out",
    //   duration: 2,
    //   delay: 2
    // })
    // .from(this.hero_header.nativeElement, {
    //   opacity: 0,
    //   ease: "sine.out",
    //   duration: 2
    // })
  }

  rotateCompass() {
    gsap.to(this.compass.nativeElement, {
      scrollTrigger: {
        trigger: this.main.nativeElement,
        start: "top top",
        scrub: true,
      },
      rotation: 360,
    })
  }

  animateMainPage() {
    this.cards.forEach(card => {
      gsap.set(card.nativeElement, { position: 'absolute' })
    })

    gsap.to(".features_section", {
      scrollTrigger: {
        trigger: this.features.nativeElement,
        start: "top top",
        end: "+=2000px 300px",
        scrub: true,
        pin: true,
      },
      yPercent: -150, stagger: 0.217,
    })

    this.rotateCompass();
  }

  ruleHr() {
    this.hr.forEach(line => {
      gsap.to(line.nativeElement, {
        scrollTrigger: {
          trigger: line.nativeElement,
          start: "top 90%",
          end: "top 10%",
          scrub: true,
        },
        width: "100%",
      })
    })
  }
}
