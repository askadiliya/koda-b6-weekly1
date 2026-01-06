import { rl } from "./rl.js";
import { keranjang } from "./state.js";

const URL ="https://raw.githubusercontent.com/askadiliya/koda-b6-weekly1/refs/heads/main/data.json";

export async function lihatDanPesanMakanan() {
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
