import { Component } from '@angular/core';
import { FairShareProxyService } from '../fair-share-proxy.service';

import {MatTableDataSource} from '@angular/material/table';
import { Router} from '@angular/router';

@Component({
  selector: 'app-all-receipts-page',
  templateUrl: './all-receipts-page.component.html',
  styleUrl: './all-receipts-page.component.css'
})
export class AllReceiptsPageComponent {
  displayedColumns: string[] = ['receiptName', 'receiptTotalAmount', 'date', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(private fairShareProxyService: FairShareProxyService, router: Router) {
    this.fairShareProxyService.getAllReceipts().subscribe( (result: [any]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
    });
  }

  onDelete(receiptID:string) {
    this.fairShareProxyService.deleteReceipt(receiptID).subscribe({
      next: () => {
        this.fairShareProxyService.getAllReceipts().subscribe( (result: [any]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
    });
      }
    });
  }


}
