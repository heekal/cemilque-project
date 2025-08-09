import Order from "../components/pesanan/Order";
import ItemCard from "../components/pesanan/ItemCard";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Pesanan() {
  const url = `${import.meta.env.VITE_API_URL}`;

  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(false);
  const [loading] = useState(false);
  const [saving, setSaving] = useState(false);

  // KEY UNTUK FORCE RE-RENDER SEMUA KOMPONEN
  const [resetKey] = useState(0);

  const [tableDetails, setTableDetails] = useState({
    tableNum: 1,
    personName: "default",
  });

  const initialOrders = { dineIn: [], takeAway: [] };

  const [orders, setOrders] = useState(initialOrders);
  const [savedOrders, setSavedOrders] = useState(initialOrders);

  const hasUnsavedChanges = () =>
    JSON.stringify(orders) !== JSON.stringify(savedOrders);

  const handleAddMenu = ({ menu_id, menu_name, price, type }) => {
    setOrders((prev) => {
      const list = prev[type];
      const existing = list.find((item) => item.menu_id === menu_id);

      let updated;
      if (existing) {
        updated = list.map((item) =>
          item.menu_id === menu_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...list, { menu_id, menu_name, price, quantity: 1 }];
      }

      return { ...prev, [type]: updated };
    });
  };

  const handleUpdateTable = (newTable, customerName) => {
    setTableDetails({
      tableNum: newTable,
      personName: customerName || "default",
    });
  };

  const handleRemoveMenu = (menu_id, type) => {
    setOrders((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.menu_id !== menu_id),
    }));
  };

  const handleUpdateQuantity = (menu_id, type, newQuantity) => {
    setOrders((prev) => {
      const list = prev[type];

      if (newQuantity <= 0) {
        return {
          ...prev,
          [type]: list.filter((item) => item.menu_id !== menu_id),
        };
      } else {
        return {
          ...prev,
          [type]: list.map((item) =>
            item.menu_id === menu_id
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      }
    });
  };

  const handleSaveOrders = async () => {
    setSaving(true);
    setError(false);

    try {
      await axios.post(`${url}/api/orders/add-order`, {
        tableNum: tableDetails.tableNum,
        personName: tableDetails.personName,
        dineIn: orders.dineIn,
        takeAway: orders.takeAway,
        isPaid: true,
      });

      setOrders(savedOrders);
      setSavedOrders(savedOrders);

      alert("Pesanan berhasil ditambah ke Antrian");
    } catch (err) {
      setError("Gagal menyimpan pesanan: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelOrders = () => {
    if (hasUnsavedChanges()) {
      const confirmCancel = window.confirm(
        "Batalkan semua perubahan yang belum disimpan?"
      );
      if (confirmCancel) {
        setOrders(savedOrders);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/api/menus-category`);
        setMenus(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [url]); // tambahkan url di dependency

  return (
    <div className="flex h-screen">
      <div className="flex-1 pl-7 pr-2 pt-7 pb-10 overflow-y-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        {loading && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
            Memuat data...
          </div>
        )}
        {saving && (
          <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4">
            Menyimpan pesanan...
          </div>
        )}

        {menus.map((group, idx) => (
          <div key={`${idx}-${resetKey}`}>
            <h1 className="text-4xl font-bold mb-3">{group.kategori}</h1>
            <div className="flex flex-wrap flex-row">
              {group.menu.map((item, i) => (
                <ItemCard
                  key={`${item.id || i}-${resetKey}`}
                  menu_id={item.id}
                  url={item.url}
                  nama={item.nama}
                  harga={item.harga}
                  onAddMenu={handleAddMenu}
                  onRemoveMenu={handleRemoveMenu}
                  currentOrders={orders}
                  disabled={saving}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Order
        key={`order-${resetKey}`}
        orders={orders}
        onUpdateQuantity={handleUpdateQuantity}
        onSaveOrders={handleSaveOrders}
        onCancelOrders={handleCancelOrders}
        saving={saving}
        hasUnsavedChanges={hasUnsavedChanges()}
        tableNumber={tableDetails.tableNum}
        onUpdateTable={handleUpdateTable}
      />
    </div>
  );
}
