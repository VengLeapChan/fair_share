import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FairShareProxyService {
  hostUrl:string = 'http://localhost:8080/';
  userID:string = "100";

  constructor(private httpClient: HttpClient) {}

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
