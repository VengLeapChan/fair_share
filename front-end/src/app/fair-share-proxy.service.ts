import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FairShareProxyService {
  hostUrl:string = 'http://localhost:8080/';
  userID:string = "100";

  constructor(private httpClient: HttpClient) { }

  addReceipt(newReceiptData: any, userID: string): Observable<any> {
    const url = `${this.hostUrl}app/user/${userID}/receipt`; 
    return this.httpClient.post(url, newReceiptData); 
  }

  addReceiptItem(newReceiptItemData: any, userID: string, receiptID: string): Observable<any> {
    const url = `${this.hostUrl}app/user/${userID}/receipt/${receiptID}/receiptItem`;
    return this.httpClient.post(url, newReceiptItemData);
  }

  getAllReceipts() {
    return this.httpClient.get<any>( this.hostUrl + 'app/user/' + this.userID + '/receipt');
  }

  getASingleReceipt(receiptID:string) {
    return this.httpClient.get<any>(this.hostUrl + 'app/user/' + this.userID + '/receipt/' + receiptID );
  }

  getReceiptItems(receiptID: string) {
    return this.httpClient.get<any>( this.hostUrl + 'app/user/' + this.userID + '/receipt/' + receiptID + '/receiptItems' );
  }
}
