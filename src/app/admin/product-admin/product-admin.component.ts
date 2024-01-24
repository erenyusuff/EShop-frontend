import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {product} from "../../products/products.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductAdminService} from "../../_services/product-admin.service";
import {UserAdminComponent} from "../user-admin/user-admin.component";

@Component({
  selector: 'app-product-admin',
  templateUrl: 'product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  modal = 'modal';
  modal2 = 'modal2';
  name = 'Angular';
  @ViewChild('myModal') myModal: ElementRef;
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
  updateProductForm = new FormGroup({
    stock: new FormControl(''),
  });

  Product: product | any

  constructor(private productAdminService: ProductAdminService, private modalService: NgbModal) {
  }
  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
  ngOnInit(): void {
    this.productAdminService.getProducts().subscribe((result) => {
      if (result) {
        this.Product = result
        console.log(result)
      }
    })
  }


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

  deleteProduct(id: any): void {
    this.productAdminService.deleteProducts(id).subscribe()
  }

  refresh(): void {
    window.location.reload();
  }

  updateProduct(id: number): void {
    const {stock} = this.updateProductForm.value;
    this.productAdminService.updateProducts({
      stock,
    }, id).subscribe()
  }

  openModal(inp: string) {
    console.log(inp);
    this.modal = 'modal-open';
  }

  closeModal() {
    this.modal = 'modal';
  }

  openModal2(inp: string) {
    console.log(inp);
    this.modal2 = 'modal-open';
  }

  closeModal2() {
    this.modal2 = 'modal';
  }

  protected readonly ProductAdminService = this.productAdminService;
  protected readonly ondblclick = ondblclick;
  protected readonly window = window;
  protected readonly UserAdminComponent = UserAdminComponent;
}
