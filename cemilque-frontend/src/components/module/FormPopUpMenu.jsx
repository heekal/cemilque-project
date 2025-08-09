import { useState, useEffect } from "react";
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function PopUpMenu({ open, handleClose, data, onSave }) {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (data) {
        setForm(data);
        setFile(null);
        if (data.menu_url) {
          try {
            const res = await axios.get(`http://localhost:3000/api/menus/get-url/${data.menu_id}`);
            const relativePath = res.data?.menu_url;
            if (relativePath) {
              setPreviewUrl(`${relativePath}`);
            }
          } catch (err) {
            console.error("Gagal fetch gambar:", err);
          }
        } else {
          setPreviewUrl("");
        }
      }
    };
    fetchImage();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
  };

  const handleSubmit = async () => {
    let updatedForm = { ...form };

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post("http://localhost:3000/upload", formData);
        const imageUrl = res.data?.imageUrl;
        if (!imageUrl) {
          alert("Upload gagal: Server tidak mengembalikan imageUrl.");
          return;
        }
        updatedForm.menu_url = imageUrl;
      } catch (err) {
        console.error("Upload gagal:", err);
        alert("Upload gagal. Silakan coba lagi.");
        return;
      }
    }

    onSave(updatedForm);
    handleClose();
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>{data ? `Edit Menu: ${data.menu_name}` : "Tambah Menu"}</DialogHeader>
      <DialogBody className="flex flex-col gap-4">
        {/* Preview Gambar */}
        {previewUrl && (
          <div className="w-full">
            <Typography variant="small" color="blue-gray">Preview Gambar {previewUrl}</Typography>
            <img
              src={previewUrl}
              alt="Preview Menu"
              className="w-full h-48 object-cover rounded shadow"
            />
          </div>
        )}

        {/* Upload Gambar */}
        <div>
          <Typography variant="small" color="blue-gray">Upload Gambar Baru</Typography>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <Input
          label="Nama Menu"
          name="menu_name"
          value={form.menu_name || ""}
          onChange={handleChange}
        />
        <Input
          label="Kategori"
          name="menu_category"
          value={form.menu_category || ""}
          onChange={handleChange}
        />
        <Input
          label="Harga"
          name="menu_price"
          type="number"
          value={form.menu_price || ""}
          onChange={handleChange}
        />
        <Input
          label="HPP"
          name="menu_hpp"
          type="number"
          value={form.menu_hpp || ""}
          onChange={handleChange}
        />
      </DialogBody>
      <DialogFooter className="gap-x-2">
        <Button variant="text" color="gray" onClick={handleClose}>Batal</Button>
        <Button color="green" onClick={handleSubmit}>Simpan</Button>
      </DialogFooter>
    </Dialog>
  );
}
