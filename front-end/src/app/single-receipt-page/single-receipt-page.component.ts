import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FairShareProxyService } from '../fair-share-proxy.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-single-receipt-page',
  templateUrl: './single-receipt-page.component.html',
  styleUrl: './single-receipt-page.component.css'
})
export class SingleReceiptPageComponent {
  receiptID: string = '';
  receipt: any = {};

  displayedColumns: string[] = ['receiptItemName', 'receiptItemQuantity', 'receiptItemUnitPrice', 'receiptItemTotalPrice'];
  dataSource = new MatTableDataSource<any>();

  constructor(private fairShareProxyService: FairShareProxyService, private route: ActivatedRoute) {
    this.receiptID = route.snapshot.params['receiptID'];
    fairShareProxyService.getASingleReceipt(this.receiptID).subscribe( (result: any) => 
    {
      this.receipt = result; 
    });
    fairShareProxyService.getReceiptItems(this.receiptID).subscribe ((result) => {
      console.log(result);
      this.dataSource = result;
    })
  }

}
