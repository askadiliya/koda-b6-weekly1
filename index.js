import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const URL = "https://raw.githubusercontent.com/askadiliya/koda-b6-weekly1/refs/heads/main/data.json";

const keranjang = [];
const history = [];

async function lihatDanPesanMakanan() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    const { categories, menus } = data;

    console.log("\nDAFTAR MENU McD\n");

    categories.forEach((category) => {
      console.log(category.name.toUpperCase());

      const menuByCategory = menus.filter(
        (menu) =>
          menu.category_id === category.id && menu.available === true
      );

      if (menuByCategory.length === 0) {
        console.log("Tidak ada menu");
      } else {
        menuByCategory.forEach((menu) => {
          console.log(`${menu.id}. ${menu.name} - Rp${menu.price}`);
        });
      }

      console.log("");
    });

    const pilih = await rl.question(
      "Masukkan ID menu yang ingin dipesan (0 untuk kembali): "
    );

    if (pilih === "0") return;

    const menuDipilih = menus.find(
      (menu) => menu.id === Number(pilih) && menu.available === true
    );

    if (!menuDipilih) {
      console.log("\nMenu tidak valid");
      return;
    }

    keranjang.push(menuDipilih);
    console.log(`\n${menuDipilih.name} ditambahkan ke keranjang`);
  } catch (error) {
    console.log("Gagal mengambil data");
  }
}

function tampilkanKeranjang() {
  console.log("\nISI KERANJANG\n");

  if (keranjang.length === 0) {
    console.log("Keranjang kosong");
    return;
  }

  keranjang.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - Rp${item.price}`);
  });
}

function checkout() {
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
    total: total
  });

  keranjang.length = 0;

  console.log("\nCheckout berhasil");
}

function tampilkanHistory() {
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

async function menuUtama() {
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

menuUtama();
