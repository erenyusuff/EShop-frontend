import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Product} from "../../products/products.model";
import {ProductAdminService} from "../../_services/product-admin.service";
import {UserAdminComponent} from "../user-admin/user-admin.component";
import {ModalComponent} from "../../modal/modal.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {Modal2Component} from "../../modal2/modal2.component";
import {ActivatedRoute} from "@angular/router";
import {result} from "lodash";

@Component({
  selector: 'app-product-admin',
  templateUrl: 'product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  productList: Product | any
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRef2: MdbModalRef<Modal2Component> | null = null;
  modal = 'modal';
  name = 'Angular';
  @ViewChild('myModal') myModal: ElementRef;
  Product: Product | any
  a: any
  constructor(private productAdminService: ProductAdminService, private modalService: MdbModalService, private route: ActivatedRoute) {

  }

  isSubMenuOpen: boolean = false;

  ngOnInit(): any {
    this.a = this.route.snapshot.paramMap.get("page")
    this.productAdminService.productList(this.a).subscribe((result: any) => {
      if (result) {
        this.productList = result.data;
      }
    })
    return this.productList
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  getData() {
    this.productAdminService.getProducts().subscribe((result) => {
      if (result) {
        this.Product = result
      }
    })
  }


  deleteProduct(id: any): void {
    this.productAdminService.deleteProducts(id).subscribe()
    this.getData()
  }

  refresh(): void {
    window.location.reload()
  }

  openModalReal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

  openModalEdit(productName: string, price: number, stock: number, description: string, img: string, category: string, id: number) {
    this.modalRef2 = this.modalService.open(Modal2Component)
    this.modalRef2?.component.loadData(productName, price, stock, description, img, category, id)
    this.getData()
  }

  protected readonly ProductAdminService = this.productAdminService;
  protected readonly ondblclick = ondblclick;
  protected readonly window = window;
  protected readonly UserAdminComponent = UserAdminComponent;
}
