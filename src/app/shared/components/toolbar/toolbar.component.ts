import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  nameUser!: string;
  constructor(
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  verifyUser(): boolean {
    this.nameUser = this.service.getLocalUser();
    return !!this.service.getTokenAuth();
  }

  redirectCard(path: string) {
    this.router.navigate([path]);
  }

  vehicleAccess() {
    console.log(this.service.getTokenAuth());
  }

  exit() {
    this.service.clearTokenAuth();
    this.router.navigate(['/login']);
  }

}
