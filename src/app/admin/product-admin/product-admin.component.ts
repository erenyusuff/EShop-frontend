import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {product} from "../../products/products.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductAdminService} from "../../_services/product-admin.service";
import {UserAdminComponent} from "../user-admin/user-admin.component";
import {ModalComponent} from "../../modal/modal.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-product-admin',
  templateUrl: 'product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modal = 'modal';
  modal2 = 'modal2';
  name = 'Angular';
  showModal: boolean = false
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
  updateProductForm: FormGroup;

  Product: product | any

  constructor(private productAdminService: ProductAdminService, private modalService: MdbModalService) {
  }

  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  ngOnInit(): void {
    this.updateProductForm = new FormGroup({
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


  openModal(inp: string) {
    console.log(inp);
    this.modal = 'modal-open';
  }
  openModalReal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }
  closeModal() {
    this.modal = 'modal';
  }

  openModal2(inp: string, productName: string, price: number, stock: number, description: string, img: string, category: string, id:number) {
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
