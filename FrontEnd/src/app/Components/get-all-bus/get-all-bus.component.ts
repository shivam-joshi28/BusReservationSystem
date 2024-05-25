import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../../Model/bus.model';
import { OperatorJwtClientService } from '../../Service/operator-jwt/operator-jwt-client.service';
import { TokenServiceService } from '../../Service/token/token-service.service';

@Component({
  selector: 'app-get-all-bus',
  templateUrl: './get-all-bus.component.html',
  styleUrls: ['./get-all-bus.component.css'],
})
export class GetAllBusComponent {
  busList: Bus[] = [];

  constructor(
    private operatorService: OperatorJwtClientService,
    private tokenService: TokenServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchBuses();
  }
  fetchBuses() {
    const token = this.tokenService.getToken();
    this.operatorService.getAllBuses(token).subscribe((buses: Bus[]) => {
      this.busList = buses;
    });
  }
  deleteBus(busId: number) {
    const token = this.tokenService.getToken();
    this.operatorService.deleteBus(busId, token).subscribe(
      (response) => {
        console.log('Bus deleted:', response);
      },
      (error) => {
        console.error('Error deleting Bus:', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['operator-ui']); // Replace '/' with the route you want to navigate back to
  }
}
