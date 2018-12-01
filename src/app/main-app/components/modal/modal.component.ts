import { Component, AfterViewInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {

  constructor(private modalSvc:ModalService) {}

  isVisible:boolean;
  modal:HTMLElement;
  data:any;

  ngAfterViewInit() {
    this.modal = document.querySelector('app-modal');
    this.modalSvc.isModalOpen().subscribe(val => {
      this.isVisible = val;
      if (this.isVisible) {
        this.data = this.modalSvc.getData();
        this.modal.classList.add('is-visible');
      } else {
        this.modal.classList.remove('is-visible');
      }
    });
  }

  onSave() {
  }

  onCancel() {
    this.modalSvc.close();
  }
}