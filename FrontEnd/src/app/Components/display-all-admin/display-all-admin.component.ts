import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../Model/admin.model';
import { AdminJwtClientService } from '../../Service/admin-jwt-client.service';
import { TokenServiceService } from '../../Service/token/token-service.service';

@Component({
  selector: 'app-display-all-admin',
  templateUrl: './display-all-admin.component.html',
  styleUrls: ['./display-all-admin.component.css'],
})
export class DisplayAllAdminComponent {
  adminList: Admin[] = [];

  constructor(
    private adminService: AdminJwtClientService,
    private tokenService: TokenServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchAdmins();
  }
  fetchAdmins() {
    const token = this.tokenService.getToken();
    this.adminService.alladmins(token).subscribe((admins: Admin[]) => {
      this.adminList = admins;
    });
  }
  goBack() {
    this.router.navigate(['adminUI']); // Replace '/' with the route you want to navigate back to
  }
  deleteAdmin(adminId: number) {
    const token = this.tokenService.getToken();
    this.adminService.delete(adminId, token).subscribe(
      (response) => {
        console.log('Admin deleted:', response);
      },
      (error) => {
        console.error('Error deleting admin:', error);
      }
    );
  }
}
