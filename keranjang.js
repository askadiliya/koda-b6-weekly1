import { keranjang, history } from "./state.js";

export function tampilkanKeranjang() {
  console.log("\nISI KERANJANG\n");

  if (keranjang.length === 0) {
    console.log("Keranjang kosong");
    return;
  }

  keranjang.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - Rp${item.price}`);
  });
}

export function checkout() {
  if (keranjang.length === 0) {
    console.log("\nKeranjang kosong, tidak bisa checkout");
    return;
  }

  console.log("\nINVOICE PEMBELIAN\n");

  let total = 0;

  keranjang.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - Rp${item.price}`);
    total += item.price;
  });

  console.log("\nTotal: Rp" + total);

  history.push({
    tanggal: new Date().toLocaleString(),
    items: [...keranjang],
    total
  });

  keranjang.length = 0;

  console.log("\nCheckout berhasil");
}
