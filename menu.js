import { rl } from "./rl.js";
import { lihatDanPesanMakanan } from "./makanan.js";
import { tampilkanKeranjang, checkout } from "./keranjang.js";
import { tampilkanHistory } from "./history.js";

export async function menuUtama() {
  console.log("\nSelamat Datang Di McD\n");
  console.log("1. Lihat semua makanan");
  console.log("2. Lihat keranjang");
  console.log("3. Lihat history pembelian");
  console.log("4. Checkout");
  console.log("0. Keluar");

  const pilih = await rl.question("\nPilih menu (0-4): ");

  switch (pilih) {
    case "1":
      await lihatDanPesanMakanan();
      break;
    case "2":
      tampilkanKeranjang();
      break;
    case "3":
      tampilkanHistory();
      break;
    case "4":
      checkout();
      break;
    case "0":
      console.log("\nTerima kasih telah menggunakan aplikasi McD");
      rl.close();
      return;
    default:
      console.log("\nPilihan tidak valid");
  }

  menuUtama();
}
