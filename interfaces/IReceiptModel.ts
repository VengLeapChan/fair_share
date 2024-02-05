interface Receipt {
  receiptID: string;
  totalAmount: number;
  date: Date;
  usersList: number[];
  owner: number[];
  debtsList: number[];
  itemsList: [
    {
      itemID: number;
      itemName: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }
  ];
}