import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { Auth0Service } from '../../../core/services/auth0/auth0.service';

@Component({
  selector: 'app-top-nav-bar',
  imports: [],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent implements OnInit, AfterViewInit {
  user: User | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth0Service: Auth0Service
  ) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  ngAfterViewInit(): void {
    this.setupSidebarToggle();
    this.setupSearchBarToggle();
  }

  private initializeUser(): void {
    const auth0Client = this.auth0Service.getClient();

    auth0Client
      .getUser()
      .then((user) => {
        if (user) {
          this.user = user;
        } else {
          console.error('User is undefined');
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
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

  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  signOut(event: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.auth0Service.logout();
  }
}
