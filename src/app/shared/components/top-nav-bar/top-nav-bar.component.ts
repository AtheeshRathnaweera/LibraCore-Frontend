import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  imports: [],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupSidebarToggle();
    this.setupSearchBarToggle();
  }

  private setupSidebarToggle(): void {
    const toggleSidebarBtn = this.el.nativeElement.querySelector(
      '.toggle-sidebar-btn'
    );

    if (toggleSidebarBtn) {
      const body = document.body;

      // Add event listener for the sidebar toggle button
      this.renderer.listen(toggleSidebarBtn, 'click', () => {
        if (body.classList.contains('toggle-sidebar')) {
          this.renderer.removeClass(body, 'toggle-sidebar');
        } else {
          this.renderer.addClass(body, 'toggle-sidebar');
        }
      });
    }
  }

  private setupSearchBarToggle(): void {
    const searchBarToggleBtn =
      this.el.nativeElement.querySelector('.search-bar-toggle');

    if (searchBarToggleBtn) {
      const searchBar = this.el.nativeElement.querySelector('.search-bar');

      this.renderer.listen(searchBarToggleBtn, 'click', () => {
        if (searchBar.classList.contains('search-bar-show')) {
          this.renderer.removeClass(searchBar, 'search-bar-show');
        } else {
          this.renderer.addClass(searchBar, 'search-bar-show');
        }
      });
    }
  }
}
