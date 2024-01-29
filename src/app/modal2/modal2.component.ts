import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';
import {ProductAdminService} from "../_services/product-admin.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
})
export class Modal2Component {
  updateProductForm: FormGroup;
  modal2 = 'modal2';
  showModal = false;

  constructor(public modalRef2: MdbModalRef<Modal2Component>, private productAdminService: ProductAdminService) {
  }

  loadData(productName: string, price: number, stock: number, description: string, img: string, category: string, id: number): void {
    this.updateProductForm = new FormGroup({
      productName: new FormControl(productName),
      price: new FormControl(price),
      stock: new FormControl(stock),
      description: new FormControl(description),
      img: new FormControl(img),
      category: new FormControl(category),
      id: new FormControl(id)
    });
    this.showModal = true;
    this.modal2 = 'modal-open';
  }

  updateProduct(): void {
    const {productName, price, stock, description, img, id} = this.updateProductForm.value;
    this.productAdminService.updateProducts({
      productName,
      price,
      stock,
      description,
      img,
      id
    }).subscribe()
  }
}
