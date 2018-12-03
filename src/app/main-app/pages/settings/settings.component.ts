import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Business } from './../../models/business.model';
import { Node } from './../../models/node.model'
import { BusinessService } from './../../services/business.service';
import { NotificationsService } from 'angular2-notifications';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private businessSvc:BusinessService,
              private notificationsSvc:NotificationsService,
              private modalSvc:ModalService) { }

  private businessForm:FormGroup;
  private lastStoredBusiness = new Business(null, null, null, null, null);
  private formSubmitted:boolean;
  private isLoading:boolean;

  ngOnInit() {
    this.businessForm = new FormGroup({
      name: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4)])}),
      abbrev: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(2)])}),
      location: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(2)])}),
    }, { updateOn: 'blur'});
    this.businessSvc.getBusinessData().subscribe(
      data => {
        this.businessForm.patchValue(data[0]);
      }, error => {
        throw(error);
      }
    );
    this.modalSvc.getHasAdded().subscribe(val => {
      console.log(val);
      if (val) {
        this.addFloor();
      }
    });
  }

  get f() {
    return this.businessForm.controls;
  }

  onSave() {
    this.formSubmitted = true;
    if (this.businessForm.valid) {
      // if (this.lastStoredBusiness == this.businessForm.value) {
      //   this.notificationsSvc.info('', 'Não houveram alterações.');
      // } else {
      //   this.isLoading = true;
      //   let business = new Business(null, this.f.name.value, this.f.abbrev.value, this.f.location.value, null);
      //   this.businessSvc.updateData(business).subscribe(
      //     data => {
      //       this.lastStoredBusiness = this.businessForm.value;
      //       this.notificationsSvc.success('', 'Dados salvos com sucesso.');
      //       this.isLoading = false;
      //     }, error => {
      //       this.notificationsSvc.warn('', 'Não foi possível salvar os dados. Você pode tentar recarregar a página e tentar novamente.');
      //       this.isLoading = false;
      //     }
      //   );
      // }
    }
  }

  onNewNode() {
    this.modalSvc.open('add-bin');
  }

  onAddNewFloor() {
    this.modalSvc.open('add-floor');
  }

  addFloor() {
    if (!this.lastStoredBusiness.floors) {
      // this.lastStoredBusiness.floors = 1;
    } else {
      // this.lastStoredBusiness.floors++;
    }
    console.log(this.lastStoredBusiness.floors);
  }

}
