import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Operator } from '../../Model/busoperator.model';
import { OperatorService } from '../../Service/operator-jwt/operator.service';

@Component({
  selector: 'app-bus-operator-signup',
  templateUrl: './bus-operator-signup.component.html',
  styleUrls: ['./bus-operator-signup.component.css'],
})
export class BusOperatorSignupComponent {
  operator: Operator = new Operator();

  constructor(
    private operatorService: OperatorService,
    private router: Router
  ) {}

  createOperator(data: Operator) {
    this.operatorService.createOperator(data).subscribe((response) => {
      console.log('Operator created successfully!', response);
      this.router.navigateByUrl('/signin');
    });
  }
}
