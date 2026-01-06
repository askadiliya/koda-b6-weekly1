import { history } from "./state.js";

export function tampilkanHistory() {
  console.log("\nHISTORY PEMBELIAN\n");

  if (history.length === 0) {
    console.log("Belum ada history pembelian");
    return;
  }

  history.forEach((invoice, index) => {
    console.log(`\nInvoice ${index + 1}`);
    console.log("Tanggal:", invoice.tanggal);

    invoice.items.forEach((item, i) => {
      console.log(`${i + 1}. ${item.name} - Rp${item.price}`);
    });

    console.log("Total: Rp" + invoice.total);
  });
}
