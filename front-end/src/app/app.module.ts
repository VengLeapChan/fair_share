import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FairShareProxyService } from './fair-share-proxy.service';
import { AllReceiptsPageComponent } from './all-receipts-page/all-receipts-page.component';
import { SingleReceiptPageComponent } from './single-receipt-page/single-receipt-page.component';
import { CreateNewReceiptPageComponent } from './create-new-receipt-page/create-new-receipt-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    AllReceiptsPageComponent,
    SingleReceiptPageComponent,
    CreateNewReceiptPageComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [FairShareProxyService, provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
