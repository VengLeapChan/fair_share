// const getAllReceipts = async () => {
//   try {
//     const receiptList = await axios.get("http://localhost:8080/app/receipt/")

//     console.log(receiptList.data.receiptList)

//     if (receiptList.data.receiptList) {
//       $(document).ready(() => {
//         receiptList.data.receiptList.forEach((receipt) => {
//           $(".receipts").append(
//             `
//             <div class="gap-1 m-2 p-2 bg-light row border rounded" id="receipt-${receipt.receiptID}" onclick="handleReceiptClick('${receipt.receiptID}')">
//               <div class="col d-flex justify-content-start align-items-center">
//                 <h3 class="m-0">${receipt.receiptName}</h3>
//               </div>
//               <div class="col d-flex align-items-center justify-content-end">
//                 <h3 class="m-0">Total Amount: ${receipt.totalAmount}</h3>
//               </div>
//               <div class="receipt-${receipt.receiptID}-list row container border">
//                 <div class="row m-0">
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">Name</h3>
//                   </div>
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">Quantity</h3>
//                   </div>
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">Unit Price($)</h3>
//                   </div>
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">Price</h3>
//                   </div>
//                 </div>

                
//                 <div class="row m-0">
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">${receipt.itemsList[0].itemName}</h3>
//                   </div>
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">${receipt.itemsList[0].quantity}</h3>
//                   </div>
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">$${receipt.itemsList[0].unitPrice}</h3>
//                   </div>
//                   <div class="col d-flex justify-content-start align-items-center">
//                     <h3 class="m-0">$${receipt.itemsList[0].totalPrice}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             `)
//           $(`.receipt-${receipt.receiptID}-list`).hide();
//         })
//       })
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }
// const handleReceiptClick = async (receiptID) => {
//   const result = await axios.get(`http://localhost:8080/app/receipt/${receiptID}`);
//   const receipt = result.data.receipt;

//   $(document).ready(() => {
//     $(`#receipt-${receiptID}`).toggleClass("pressed");

//     if ($(`#receipt-${receiptID}`).hasClass("pressed")) {
//       $(`.receipt-${receiptID}-list`).show();
//     } else {
//       $(`.receipt-${receiptID}-list`).hide();
//     }
//   })
// }
// getAllReceipts();


