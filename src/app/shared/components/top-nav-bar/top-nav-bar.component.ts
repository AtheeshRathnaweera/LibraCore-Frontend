import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { Auth0Service } from '../../../core/services/auth0/auth0.service';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/user/user.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-nav-bar',
  imports: [CommonModule],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent implements OnInit, AfterViewInit {
  user$: Observable<User | null>;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth0Service: Auth0Service,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

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
