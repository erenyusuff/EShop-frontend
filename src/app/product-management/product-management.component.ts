import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductManagementService} from "../_services/product-management.service";
import {product} from "../products/products.model";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  modal='modal';
  modal2 = 'modal2';
  name = 'Angular';
  @ViewChild('myModal') myModal: ElementRef;
  productForm = new FormGroup({
    productName : new FormControl(''),
    price : new FormControl(''),
    stock : new FormControl(''),
    description : new FormControl(''),
    img : new FormControl(''),
    category : new FormControl(''),
    id : new FormControl(''),
    createdAt : new FormControl(''),
    updatedAt : new FormControl(''),
  });
  Product: product | any

  constructor(private productManagementService: ProductManagementService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.productManagementService.getProducts().subscribe((result) => {
      if (result) {
        this.Product = result
        console.log(result)
      }
    })
  }
  addProduct(): void {
    const {productName, price, stock, description, img, category, id, createdAt, updatedAt} = this.productForm.value;
    this.productManagementService.addProduct({
      productName,
      price,
      stock,
      description,
      img,
      category,
      id,
      createdAt,
      updatedAt
    }).subscribe()
  }
deleteProduct(id: any): void {
    this.productManagementService.deleteProducts(id).subscribe()
}
refresh(): void {
    window.location.reload();
  }
updateProduct(id: number): void {
  const {productName, price, stock, description, img, category, createdAt, updatedAt} = this.productForm.value;
  this.productManagementService.updateProducts({
    productName,
    price,
    stock,
    description,
    img,
    category
  }, id).subscribe()
}

  openModal(inp: string) {
    console.log(inp);
    this.modal='modal-open';
  }
  closeModal(){
    this.modal='modal';
  }
  openModal2(inp: string) {
    console.log(inp);
    this.modal2='modal-open';
  }
  closeModal2(){
    this.modal2='modal';
  }

  protected readonly ProductManagementService = ProductManagementService;
  protected readonly ondblclick = ondblclick;
  protected readonly window = window;
}
