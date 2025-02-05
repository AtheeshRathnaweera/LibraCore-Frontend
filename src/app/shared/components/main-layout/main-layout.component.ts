import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    TopNavBarComponent,
    SideBarComponent,
    FooterComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupBackToTopBtnClick();
  }

  private setupBackToTopBtnClick(): void {
    const backToTopBtn = this.el.nativeElement.querySelector(".back-to-top");

    if (backToTopBtn) {
      const toggleBackToTop = () => {
        if (window.scrollY > 100) {
          this.renderer.addClass(backToTopBtn, 'active');
        } else {
          this.renderer.removeClass(backToTopBtn, 'active');
        }
      };

      // Listen to scroll and load events
      this.renderer.listen('window', 'load', toggleBackToTop);
      this.renderer.listen('window', 'scroll', toggleBackToTop);

      this.renderer.listen(backToTopBtn, 'click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

}
