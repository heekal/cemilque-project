import React, { useState } from "react";
import TabelBHP from "../components/penyimpanan/TabelBHP";
import TabelBahanMakanan from "../components/penyimpanan/TabelBahanMakanan";
import FormPopup from "../components/module/FormPopup";
import Menu from "../components/penyimpanan/MenuMakanan";
import { Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Penyimpanan () {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSuccess = () => {
    console.log("Data berhasil disimpan!");
    window.location.reload()
    // Tambahkan logic refresh tabel jika perlu
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto p-7 gap-7">
      <h1 className="font-bold text-4xl pb-5">PENYIMPANAN BARANG DAN BAHAN</h1>

      {/* Menu Makanan */}
      <Menu />

      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Tabel Barang</h1>
        <Button
          color="green"
          onClick={() => setOpenPopup(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="font-semibold text-sm">Tambah Barang</span>
        </Button>
      </div> 
      {/* Tabel BHP */}
      <TabelBHP />

      {/* Tabel Bahan Makanan */}
      <TabelBahanMakanan />

      {/* Popup form */}
      <FormPopup
        open={openPopup}
        handleClose={handleClosePopup}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
