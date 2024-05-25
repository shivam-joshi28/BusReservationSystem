import { Component, OnInit } from '@angular/core';
import { Admin } from '../../Model/admin.model';
import { AdminService } from '../../Service/admin.service';

import { Router } from '@angular/router';
import { TokenServiceService } from '../../Service/token/token-service.service';
import { AdminJwtClientService } from '../../Service/admin-jwt-client.service';
import { OperatorService } from '../../Service/operator-jwt/operator.service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.css'],
})
export class AdminUIComponent {
  token: any; // Define the token property
  admin!: Admin;
  loggedInUsername: string = '';

  constructor(
    private router: Router,
    private adminService: AdminJwtClientService,
    private tokenservice: TokenServiceService,
    private busService: OperatorService
  ) {}
  ngOnInit(): void {
    // Retrieve the admin's name when the component initializes
    let id = Number(sessionStorage.getItem('id'));
    this.token = this.tokenservice.getToken();
    this.adminService.getAdminById(id, this.token).subscribe((response) => {
      this.admin = response;
      this.loggedInUsername = this.admin.firstName; // Store the admin's name
    });
  }

  getalladmins() {
    this.token = this.tokenservice.getToken();
    this.adminService.alladmins(this.token).subscribe((response) => {
      // Display the response in the console

      this.router.navigate(['/display-all-admin']);
    });
  }
  onUpdateUser() {
    this.router.navigate(['/update-admin']);
  }

  goBack() {
    this.router.navigate(['/']); // Replace '/' with the route you want to navigate back to
  }

  createBus() {
    this.router.navigate(['/add-bus']);
  }

  logout() {
    // Clear the token when logging out
    this.tokenservice.clearToken();
    this.router.navigate(['/dashboard']);
  }
  getallUsers() {
    this.token = this.tokenservice.getToken();
    this.adminService.allUsers(this.token).subscribe((response) => {
      // Display the response in the console

      this.router.navigate(['/getAllUsers']);
    });
  }
  getallBuses() {
    this.token = this.tokenservice.getToken();
    this.adminService.allBus(this.token).subscribe((response) => {
      // Display the response in the console

      this.router.navigate(['/all-buses']);
    });
  }
  getallOperator() {
    this.token = this.tokenservice.getToken();
    this.adminService.allBusOperators(this.token).subscribe((response) => {
      // Display the response in the console

      this.router.navigate(['/getAllOperator']);
    });
  }
}
