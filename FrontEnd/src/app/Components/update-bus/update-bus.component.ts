import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../Model/bus.model';
import { OperatorJwtClientService } from '../../Service/operator-jwt/operator-jwt-client.service';
import { TokenServiceService } from '../../Service/token/token-service.service';

@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.css'],
})
export class UpdateBusComponent {
  bus: Bus = new Bus(0, '', 0, '', '', 0, 0, '', 0, new Date(), 0);

  constructor(
    private busService: OperatorJwtClientService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenServiceService
  ) {}

  updateBusDetails() {
    const token = this.tokenService.getToken();
    console.log(token);
    this.busService.updateBus(this.bus, token).subscribe(
      () => {
        console.log('bus updated');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  goBack() {
    this.router.navigate(['operator-ui']); // Replace '/' with the route you want to navigate back to
  }
  logout() {
    // Clear the token when logging out
    this.tokenService.clearToken();
    this.router.navigate(['/dashboard']);
  }
}
