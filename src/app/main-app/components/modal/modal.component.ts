import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { NotificationsService } from 'angular2-notifications';
import * as ProgressBar from 'progressbar.js';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {

  constructor(private modalSvc:ModalService,
              private fileUploadSvc: FileUploadService,
              private notificationsSvc: NotificationsService,
              private businessSvc:BusinessService) {}

  isVisible:boolean;
  modal:HTMLElement;
  data:any;
  private newBinForm:FormGroup;
  private newFloorForm:FormGroup;
  private newAreaForm:FormGroup;
  @ViewChild('file') file;
  public files: Set<File> = new Set();
  progress;
  currProgress:Number;
  primaryButtonText = 'Enviar';
  uploading = false;
  uploadSuccessful = false;
  line;
  newBinCoordinates;

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
    this.newBinForm = new FormGroup({
      name: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4)])}),
      location: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4)])})
    }, { updateOn: 'blur'});
    this.newFloorForm = new FormGroup({
      name: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4)])})
    });
    this.newAreaForm = new FormGroup({
      name: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4)])})
    });
  }

  onCancel() {
    this.modalSvc.close();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  onSave() {
    if (this.data.type == 'add-floor') {
      if (!this.line) {
        this.line = new ProgressBar.Line('.progress-bar', {
          color: '#396AEF',
        });
      }
      this.line.animate(this.currProgress);
      this.uploading = true;
      this.progress = this.fileUploadSvc.upload(this.files, this.newFloorForm.controls['name'].value);
      let allProgressObservables = [];
      
      for (let key in this.progress) {
        allProgressObservables.push(this.progress[key].progress);
      }
  
      this.primaryButtonText = 'Finish';

      let key = Object.keys(this.progress)[0];

      this.progress[key].progress.subscribe(val => {
        this.currProgress = val;
      });
    
      forkJoin(allProgressObservables).subscribe(end => {
        this.uploadSuccessful = true;
        this.uploading = false;
        this.modalSvc.updateHasAdded(true);
        this.modalSvc.close();
        this.notificationsSvc.success('', 'Andar adicionado e imagem salva com sucesso!');
        this.newFloorForm.reset();
      });
    } else if (this.data.type == 'add-area') {
      this.modalSvc.setAddAreaReturnData(this.newAreaForm.controls.name.value);
      this.newAreaForm.reset();
      this.modalSvc.close();
    } else if (this.data.type == 'add-bin') {
      this.modalSvc.setAddBinReturnData(this.newBinForm.controls.name.value, this.newBinCoordinates);
      this.newBinForm.reset();
      this.modalSvc.close();
    }
  }
  
  receberCoordenadas(evt) {
    this.newBinCoordinates = evt;
  }
}