import {Component, OnInit} from "@angular/core";
import {CartService} from "../_services/cart.service";
import {Cart, CartProducts, product} from "./cart.model";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart
  cartProducts: CartProducts
  product: product

  closeResult: string;

  constructor(private cartService: CartService, private route: Router, private modalService: NgbModal) {
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
        this.route.navigate(["bought"])
        console.log(result)
      }
    })
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

}

