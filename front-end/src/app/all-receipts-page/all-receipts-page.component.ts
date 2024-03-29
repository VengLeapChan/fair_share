import { Component } from '@angular/core';
import { FairShareProxyService } from '../fair-share-proxy.service';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private fairShareProxyService: FairShareProxyService, 
    private router: Router,
    private toastr: ToastrService) {
    this.fairShareProxyService.getAllReceipts().subscribe( (result: [any]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
    });
  }



  onDelete(receiptID:string) {
    this.fairShareProxyService.deleteReceipt(receiptID).subscribe({
      next: () => {
        this.toastr.success("You have deleted receipt with ID.", "Successfully Deleted Receipt!")
        this.fairShareProxyService.getAllReceipts().subscribe( (result: [any]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
    });
      }
    });
  }


}
