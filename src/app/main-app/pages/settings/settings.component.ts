import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Business } from './../../models/business.model';
import { Node } from './../../models/node.model'
import { BusinessService } from './../../services/business.service';
import { NotificationsService } from 'angular2-notifications';
import { ModalService } from '../../services/modal.service';
import * as TreeModel from 'tree-model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations:[
    trigger(
      'enterAnimation', [
        transition(':enter', [
          // style({transform: 'translateY(10%)', opacity: 0}),
          animate('150ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          // style({transform: 'translateY(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateY(10%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class SettingsComponent implements OnInit {

  constructor(private businessSvc:BusinessService,
              private notificationsSvc:NotificationsService,
              private modalSvc:ModalService) { }

  private businessForm:FormGroup;
  private lastStoredBusiness = new Business(null, null, null, null, null, null);
  private formSubmitted:boolean;
  private isLoading:boolean;
  private floors = [];
  private tree = new TreeModel();
  private root: any;
  private children: any;
  private currNode:any;
  private nodeChanges = false;

  ngOnInit() {
    this.businessForm = new FormGroup({
      name: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4)])}),
      abbrev: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(2)])}),
      location: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(2)])}),
    }, { updateOn: 'blur'});
    this.businessSvc.getBusinessData().subscribe(
      data => {
        // console.log(data[0].children)
        this.root = this.tree.parse(data[0]);
        console.log(this.root);
        this.children = this.root.children;
        this.floors = data[0].floors;
        this.businessForm.patchValue(data[0]);
      }, error => {
        throw(error);
      }
    );
    this.modalSvc.getHasAdded().subscribe(val => {
      if (val) {
        this.addFloor();
        this.nodeChanges = true;
      }
      this.nodeChanges = true;
    });
    this.modalSvc.getAreaReturnData().subscribe(val => {
      if (val) {
        let node = new Node();
        node.name = val;
        node.type = 'space';
        node.children = [];
        let node_ = this.tree.parse(node);
        if (this.currNode) {
          this.currNode.addChild(node_);
          this.children = this.currNode.children;
        } else {
          this.root.addChild(node_);
          this.children = this.root.children;
        }
      }
      this.nodeChanges = true;
    });
    this.modalSvc.getBinReturnData().subscribe(val => {
      if (val) {
        let node = new Node();
        node.name = val.name;
        node.type = 'bin';
        node.coordinates = val.coordinates;
        node._id = val._id;
        node.children = [];
        let node_ = this.tree.parse(node);
        if (this.currNode) {
          this.currNode.addChild(node_);
          this.children = this.currNode.children;
        } else {
          this.root.addChild(node_);
          this.children = this.root.children;
        }
        this.nodeChanges = true;
      }
    });
  }

  get f() {
    return this.businessForm.controls;
  }

  updateView(node) {
    if (node.model.type !== 'bin') {
      this.children = node.children;
      this.currNode = node;
    }
  }

  goUp() {
    this.currNode = this.root.parent;
    this.children = this.root.children;
  }

  onSave() {
    this.formSubmitted = true;
    if (this.businessForm.valid) {
      if (this.lastStoredBusiness == this.businessForm.value || !this.nodeChanges) {
        this.notificationsSvc.info('', 'Não houveram alterações.');
      } else {
        this.isLoading = true;
        let business = new Business(null, this.f.name.value, this.f.abbrev.value, this.f.location.value, null, this.root.model.children);
        this.businessSvc.updateData(business).subscribe(
          data => {
            this.lastStoredBusiness = this.businessForm.value;
            this.notificationsSvc.success('', 'Dados salvos com sucesso.');
            this.isLoading = false;
          }, error => {
            console.log(error);
            this.notificationsSvc.warn('', 'Não foi possível salvar os dados. Você pode tentar recarregar a página e tentar novamente.');
            this.isLoading = false;
          }
        );
      }
    }
  }

  onNewBin() {
    this.modalSvc.open('add-bin');
  }

  onNewArea() {
    this.modalSvc.open('add-area');
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
  }

}
