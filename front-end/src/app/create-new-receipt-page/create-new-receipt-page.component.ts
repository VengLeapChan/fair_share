import { Component } from '@angular/core';
import { FairShareProxyService } from '../fair-share-proxy.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-new-receipt-page',
  templateUrl: './create-new-receipt-page.component.html',
  styleUrls: ['./create-new-receipt-page.component.css']
})
export class CreateNewReceiptPageComponent {
  newReceiptData: any = { items: [{}] };

  constructor(
    private fairShareProxyService: FairShareProxyService,
    private toastr: ToastrService,
  ) { }

  onSubmit(): void {
    console.log('Add Receipt button clicked'); 
    this.fairShareProxyService.addReceipt(this.newReceiptData, '100').subscribe({
      next: (response) => {
        console.log('Receipt added successfully:', response);
        this.addReceiptItems(response.receiptID);
        
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
      this.fairShareProxyService.addReceiptItem(item, '100', receiptID).subscribe({
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
    this.newReceiptData.amount = this.newReceiptData.items.reduce((total: number, item: any) => total + (item.receiptItemTotalPrice || 0), 0);
  }
  

  calculateTotalPrice(item: any): void {
    item.receiptItemTotalPrice = item.receiptItemUnitPrice * item.receiptItemQuantity;
    this.calculateTotalReceiptAmount();
  }
  
  addMoreItem(): void {
    this.newReceiptData.items.push({ name: '', quantity: 0, unitPrice: 0, totalPrice: 0 });
    this.calculateTotalReceiptAmount();
  }
  
  deleteItem(): void {
    if (this.newReceiptData.items.length > 1) {
      this.newReceiptData.items.pop();
      this.calculateTotalReceiptAmount();
    }
  }
  

  updateOutsideValue(event: any): void {
    this.newReceiptData.name = event;

  }

  
  
}
