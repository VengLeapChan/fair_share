import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FairShareProxyService } from '../fair-share-proxy.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-single-receipt-page',
  templateUrl: './single-receipt-page.component.html',
  styleUrl: './single-receipt-page.component.css'
})
export class SingleReceiptPageComponent {
  receiptID: string = '';
  receipt: any = {};

  constructor(private fairShareProxyService: FairShareProxyService, private route: ActivatedRoute) {
    this.receiptID = route.snapshot.params['receiptID'];
    fairShareProxyService.getASingleReceipt(this.receiptID).subscribe( (result: any) => 
    {
      this.receipt = result[0]; 
    });
  }

}
