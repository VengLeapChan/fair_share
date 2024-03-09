import { Component } from '@angular/core';
import { FairShareProxyService } from '../fair-share-proxy.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-receipt-page',
  templateUrl: './create-new-receipt-page.component.html',
  styleUrls: ['./create-new-receipt-page.component.css']
})
export class CreateNewReceiptPageComponent {
  newReceiptData: any = { receiptName: '', receiptTotalAmount: 0, items: [{}] };

  constructor(
    private fairShareProxyService: FairShareProxyService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  onSubmit(): void {
    console.log('Add Receipt button clicked'); 
    console.log(this.newReceiptData);
    this.fairShareProxyService.addReceipt(this.newReceiptData).subscribe({
      next: (response) => {
        console.log('Receipt added successfully:', response);
        this.addReceiptItems(response.receiptID);
        this.router.navigate(['/receipt/' +  response.receiptID])
      },
      error: (error) => {
        console.error('Error adding receipt:', error);
      }
    });
  }

  showToastr() {
    this.toastr.success('Successfully added receipt.', "Success!")
  }
  
  addReceiptItems(receiptID: string): void {

    for (let item of this.newReceiptData.items) {
      this.fairShareProxyService.addReceiptItem(item, receiptID).subscribe({
        next: (response) => {
          console.log('Receipt item added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding receipt item:', error);
        }
      });
    }
  }
  

  calculateTotalReceiptAmount(): void {
    this.newReceiptData.receiptTotalAmount = this.newReceiptData.items.reduce((total: number, item: any) => total + (item.receiptItemTotalPrice || 0), 0);
  }
  

  calculateTotalPrice(item: any): void {
    item.receiptItemTotalPrice = item.receiptItemUnitPrice * item.receiptItemQuantity;
    this.calculateTotalReceiptAmount();
  }
  
  addMoreItem(): void {
    this.newReceiptData.items.push({});
    this.calculateTotalReceiptAmount();
  }
  
  deleteItem(): void {
    if (this.newReceiptData.items.length > 1) {
      this.newReceiptData.items.pop();
      this.calculateTotalReceiptAmount();
    }
  }
  

  updateOutsideValue(event: any): void {
    this.newReceiptData.receiptName = event;

  }
  
}
