import {Component, OnInit} from "@angular/core";
import {CartService} from "../_services/cart.service";
import {Cart, CartProducts, product} from "./cart.model";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import type = _default.defaults.animations.numbers.type;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart
  cartProducts: CartProducts | any
  product: product

  closeResult: string;

  constructor(private cartService: CartService, private route: Router, private modalService: NgbModal, private snackBar: MatSnackBar) {
  }
  snackBarOpener(message: string, action?: string) {
    this.snackBar.open(message, action,  {
      duration: 3000,
      panelClass: ['mat-toolbar'],
    }); this.route.navigate(["orders"])

  }
  openSnackBar() {
    this.snackBarOpener('Payment is successful. Redirecting to orders page');
  }
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((result) => {
      if (result) {
        this.cart = result;
        console.log(result)
      }
    })
  }

  buyCart() {
    this.cartService.buyCart(this.cart.id).subscribe((result) => {
      if (result) {
        console.log(result)
      }
    })
  }


  showAlert() {

  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  protected readonly alert = alert;
  protected readonly onwaiting = onwaiting;
}

