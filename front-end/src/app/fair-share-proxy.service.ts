import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FairShareProxyService {
  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  addReceipt(newReceiptData: any): Observable<any> {
    const url = `${this.hostUrl}app/receipt`; 
    return this.httpClient.post(url, newReceiptData); 
  }

  addReceiptItem(newReceiptItemData: any, receiptID: string): Observable<any> {
    const url = `${this.hostUrl}app/receipt/${receiptID}/receiptItem`;
    return this.httpClient.post(url, newReceiptItemData);
  }

  getAllReceipts() {
    return this.httpClient.get<any>( this.hostUrl + 'app/receipt');
  }

  getASingleReceipt(receiptID:string) {
    return this.httpClient.get<any>(this.hostUrl + 'app/receipt/' + receiptID );
  }

  getReceiptItems(receiptID: string) {
    return this.httpClient.get<any>( this.hostUrl + 'app/receipt/' + receiptID + '/receiptItems' );
  }

  deleteReceipt(receiptID: string) {
    return this.httpClient.delete(this.hostUrl + 'app/receipt/' + receiptID);
    
  }

  checkAuth(): Observable<any> {
    return this.httpClient.get('/app/check-auth');
  }

  logoutAPI() {
    return this.httpClient.get('/app/logout');
  }
}
