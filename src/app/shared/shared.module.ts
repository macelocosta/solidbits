import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDataService } from './services/card-data.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [CardDataService]
})
export class SharedModule { }
