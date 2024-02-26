import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReceiptsPageComponent } from './all-receipts-page/all-receipts-page.component';
import { CreateNewReceiptPageComponent } from './create-new-receipt-page/create-new-receipt-page.component';
import { SingleReceiptPageComponent } from './single-receipt-page/single-receipt-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {path: "", component: WelcomePageComponent},
  {path:"receipts", component: AllReceiptsPageComponent},
  {path:"createReceipt", component: CreateNewReceiptPageComponent},
  {path:"receipts/:id", component: SingleReceiptPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
