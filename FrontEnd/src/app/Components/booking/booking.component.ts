import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../Model/booking.model';
import { Bus } from '../../Model/bus.model';
import { Customer } from '../../Model/customer.model';
import { BookingService } from '../../Service/booking/booking.service';
import { BusService } from '../../Service/bus/bus.service';
import { TokenServiceService } from '../../Service/token/token-service.service';
import { UserJwtClientService } from '../../Service/user-jwt/user-jwt-client.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  errorOccurred!: string;
  email: string = '';
  bookingDate!: Date;
  selectedSeats!: string[];
  totalSeats!: number;
  busId!: number;

  amount!: number;
  bus!: Bus;
  ticketsId!: number;
  ticket: Booking = {
    bookingId: 0,
    bookingDate: new Date(),
    email: '',
    amount: 0,
    totalcustomer: 0,
    seatNo: '',
  };
  passengers: Customer[] = [];
  totalCustomer!: number;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private tokenService: TokenServiceService,
    private userJwtClientService: UserJwtClientService,
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      this.bookingDate = data['date'];
      this.selectedSeats = data['seats'] ? JSON.parse(data['seats']) : [];
      this.busId = data['busId'];
      console.log(this.busId);

      this.totalSeats = data['selectedSeatCount'];
      this.busService.getBusById(this.busId).subscribe((response) => {
        this.bus = response;
        this.amount = this.totalSeats * this.bus.fare;
        this.totalCustomer = this.totalSeats;
      });
    });
  }

  bookTicket() {
    this.ticket.bookingDate = this.bookingDate;
    this.ticket.email = this.email;
    this.ticket.amount = this.amount;
    this.ticket.totalcustomer = this.totalCustomer;
    this.ticket.seatNo = this.selectedSeats.join(', ');

    // Retrieve user ID and token from sessionStorage
    let storedId = sessionStorage.getItem('id');
    const token = this.tokenService.getToken(); // Assuming you have a stored token

    if (!storedId || !token) {
      console.error('User ID or Token not found in sessionStorage');
      // Handle the case where the user ID or Token is not available in sessionStorage
      return;
    }

    console.log('Retrieved User ID:', storedId);
    console.log('Retrieved Token:', token);

    this.bookingService
      .createBooking(this.ticket, this.busId, +storedId)
      .subscribe(
        (response) => {
          this.ticketsId = response.bookingId;

          // Handle success of booking creation
          this.userJwtClientService
            .sendEmailOnBooking(this.ticketsId)
            .subscribe(
              (emailResponse) => {
                console.log('Email sent:', emailResponse);
                // Handle success of email sending if needed
              },
              (emailError) => {
                console.error('Error sending email:', emailError);
                // Handle error in sending email if needed
              }
            );

          // After successful booking and possibly email sending, navigate to success page
          this.router.navigate([
            'view-booking',
            this.ticketsId,
            this.busId,
            { amount: this.amount },
          ]);
        },
        (error) => {
          console.error('Error creating booking:', error);
          // Handle error in booking creation
        }
      );
  }
  back() {
    this.router.navigate(['/book-bus']); // Replace '/' with the route you want to navigate back to
  }
}
