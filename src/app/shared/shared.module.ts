import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDataService } from './services/card-data.service';
import { OptionSelectorService } from './services/option-selector.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SafeHtmlPipe],
  exports: [SafeHtmlPipe],
  providers: [CardDataService, OptionSelectorService, SafeHtmlPipe]
})
export class SharedModule { }
