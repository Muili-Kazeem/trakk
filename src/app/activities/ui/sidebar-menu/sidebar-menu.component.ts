import { Component, EventEmitter, Output } from '@angular/core';
import { iconSelect } from '../../utils/funcs/iconSelect';
import { AuthService } from 'src/app/auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user$ = this.authService.getAuth();

  icon(category: string) {
    return iconSelect(category)
  }

  @Output() display: EventEmitter<boolean> = new EventEmitter<boolean>();

  switchDisplay() {
    this.display.emit(false)
  }

  logout() {
    if (confirm("Are you sure you want to logout?")) {
      this.authService.logout().then(val => {
        this.switchDisplay()
        // A modal confirmation
        this.router.navigate(["/auth"]);
      })
    }
  }

}
