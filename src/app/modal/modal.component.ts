import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductAdminService} from "../_services/product-admin.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  productForm = new FormGroup({
    productName: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    category: new FormControl(''),
    id: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
  });
  constructor(public modalRef: MdbModalRef<ModalComponent>, private productAdminService: ProductAdminService) {}

  addProduct(): void {
    const {productName, price, stock, description, img, category, id, createdAt, updatedAt} = this.productForm.value;
    this.productAdminService.addProduct({
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
}
