import React, { useEffect, useState } from "react";
import axios from "axios";
import PopUpMenu from "../module/FormPopUpMenu";
import { Card, Typography, Input, Button } from "@material-tailwind/react";

export default function MenuMakanan() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const BASE_URL = "http://localhost:3000"; // Base URL backend

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/menus/get-all`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredData = data.filter((item) =>
    item.menu_name.toLowerCase().includes(search.toLowerCase())
  );


  const handleEdit = () => {
    setPopupOpen(true);
  };

  const handleSaveEdit = async (editedMenu) => {
    try {
      if (editedMenu.menu_id) {
        // MODE EDIT
        await axios.put(`${BASE_URL}/api/menus/update/${editedMenu.menu_id}`);
        const updatedData = data.map((item) =>
          item.menu_id === editedMenu.menu_id ? editedMenu : item
        );
        setData(updatedData);
        setSelectedMenu(editedMenu);
      } else {
        // MODE TAMBAH
        const response = await axios.post(`${BASE_URL}/api/menus/create`, editedMenu);
        const newMenu = response.data;
        setData([...data, newMenu]);
      }
      setPopupOpen(false); // Tutup popup setelah simpan
    } catch (error) {
      console.error("Gagal menyimpan menu:", error);
      alert("Gagal menyimpan menu.");
    }
  };


  const handleDelete = async () => {
  const confirm = window.confirm("Apakah benar ingin dihapus?");
  if (!confirm || !selectedMenu) return;

  try {
    await axios.delete(`${BASE_URL}/api/menus/delete/${selectedMenu.menu_id}`);
    setData(data.filter((item) => item.menu_id !== selectedMenu.menu_id));
    setSelectedMenu(null);
  } catch (error) {
    console.error("Gagal menghapus menu:", error);
    alert("Gagal menghapus menu.");
  }
  };

  return (
    <div className="flex w-full min-h-[475px] max-h-[475px]">
      <div className="flex flex-col w-full justify-between">
        <div className="mb-4 flex items-center gap-10">
          <Typography variant="h5" className="font-bold text-gray-900">
            🍽️ DAFTAR MENU
          </Typography>
          <Button color="blue" size="sm" onClick={() => {
            setSelectedMenu(null); // Reset form jika sebelumnya sedang edit
            setPopupOpen(true);
          }}>
            + Tambah Menu
          </Button>
        </div>
        <div className="flex gap-5">
          {/* Bagian Kiri - Tabel */}
          <div className="flex flex-col w-3/4">
            <Card className="p-6 shadow-md rounded-xl bg-white">
              {/* Input Pencarian */}
              <div className="w-full mb-4">
                <Input
                  label="Cari Nama Menu"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  crossOrigin=""
                  className="w-full"
                  containerProps={{ className: "min-w-[120px]" }}
                />
              </div>

              {/* Tabel */}
              <div className="overflow-x-auto  h-[320px] overflow-y-auto rounded-md">
                <table className="w-full text-left border border-gray-200 ">
                  <thead>
                    <tr className="bg-gray-100 text-gray-900 uppercase text-xs">
                      {["No", "Nama Menu", "Kategori", "Harga", "HPP"].map((head) => (
                        <th
                          key={head}
                          className="px-5 py-3 font-bold tracking-wider border-b border-gray-300"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, idx) => (
                        <tr
                          key={item.menu_id}
                          className={`cursor-pointer transition-colors  ${
                            selectedMenu?.menu_id === item.menu_id
                              ? "bg-gray-300"
                              : "bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedMenu(item)}
                        >
                          <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                            {idx + 1}
                          </td>
                          <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                            {item.menu_name}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-900 border-b border-gray-200">
                            {item.menu_category}
                          </td>
                          <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                            Rp.{item.menu_price}
                          </td>
                          <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                            Rp.{item.menu_hpp}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-6 text-gray-500 border-gray-200"
                        >
                          {search ? "Data tidak ditemukan" : "Belum ada data"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Bagian Kanan - Detail Menu */}
          <div className="w-1/4 justify-evenly">
            <Card className="flex px-4 h-full items-center">
              {selectedMenu ? (
                <div className="flex flex-col items-center">
                  <div className="h-3/4 pt-4 mb-4">
                    <Typography variant="h6" className="mb-2 font-semibold text-gray-900">
                      {selectedMenu.menu_name}
                    </Typography>

                    <img
                      src={selectedMenu.menu_url}
                      alt={selectedMenu.menu_name}
                      className="object-cover rounded w-60"
                    />
                  </div>
                  <div className="flex flex-row mb-2">
                    <div className="">
                      <Typography className="mb-2 text-sm text-gray-800">
                        <strong>Kategori:</strong> {selectedMenu.menu_category}
                      </Typography>
                      <Typography className="mb-2 text-sm text-gray-800">
                        <strong>Harga:</strong> {selectedMenu.menu_price}
                      </Typography>
                      <Typography className="mb-2 text-sm text-gray-800">
                        <strong>HPP:</strong> {selectedMenu.menu_hpp}
                      </Typography>
                    </div>

                    <div className="flex justify-end gap-2 items-end">
                      <Button 
                        size="sm" 
                        color="red"
                        onClick={handleDelete}
                      >
                        Hapus
                      </Button>
                      <Button 
                        size="sm" 
                        color="green"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center align-middle text-center justify-center text-gray-500 h-full">
                  <h1 className="">Klik salah satu menu untuk melihat detail</h1>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* PopUp Edit Menu */}
      <PopUpMenu
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        data={selectedMenu}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
