import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-config',
  standalone: false,
  templateUrl: 'modal.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = true;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  // close(content: any) {
  //   this.modalService.
  // }
}
