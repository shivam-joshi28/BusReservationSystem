import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Operator } from '../../Model/busoperator.model';
import { OperatorJwtClientService } from '../../Service/operator-jwt/operator-jwt-client.service';
import { TokenServiceService } from '../../Service/token/token-service.service';

@Component({
  selector: 'app-update-bus-operator',
  templateUrl: './update-bus-operator.component.html',
  styleUrls: ['./update-bus-operator.component.css'],
})
export class UpdateBusOperatorComponent {
  operator: Operator = new Operator();

  operatorId!: number;
  constructor(
    private operatorService: OperatorJwtClientService,
    private tokenService: TokenServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.operatorId = Number(sessionStorage.getItem('operatorId'));
    this.operatorService.getoperatorById(this.operatorId).subscribe((data) => {
      this.operator = data;
    });
  }

  updateBusOperator() {
    const token = this.tokenService.getToken();

    this.operatorService.updateBusOperator(this.operator, token).subscribe(
      (response) => {
        console.log('BusOperator updated:', response);
        this.router.navigate(['/operator-ui']);
      },
      (error) => {
        console.error('Error updating BusOperator:', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['operator-ui']); // Replace '/' with the route you want to navigate back to
  }
}
