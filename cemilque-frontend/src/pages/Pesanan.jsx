import Order from "../components/pesanan/Order"
import ItemCard from "../components/pesanan/ItemCard"
import axios from 'axios'
import { useState, useEffect } from "react"

export default function Pesanan () {
  const url = `${import.meta.env.VITE_API_URL}`;

  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // KEY UNTUK FORCE RE-RENDER SEMUA KOMPONEN
  const [resetKey, setResetKey] = useState(0);
  
  const [tableDetails, setTableDetails] = useState({
    tableNum: 1,
    personName: "default",
  });

  // Initial state untuk reset
  const initialOrders = {
    dineIn : [],
    takeAway : []
  };

  const initialTableDetails = {
    tableNum: 1,
    personName: "default",
  };

  // Temporary orders (frontend only, not saved to DB yet)
  const [orders, setOrders] = useState(initialOrders);

  // Saved orders from database (for comparison)
  const [savedOrders, setSavedOrders] = useState(initialOrders);

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(orders) !== JSON.stringify(savedOrders);
  };

  // FUNGSI RESET LENGKAP - INI YANG PENTING!
  const resetAllState = () => {
    // Reset semua state ke kondisi awal
    setOrders(initialOrders);
    setSavedOrders(initialOrders);
    setTableDetails(initialTableDetails);
    setError(false);
    
    // KUNCI UTAMA: Increment resetKey untuk memaksa semua komponen re-render dari awal
    // Ini akan membuat semua ItemCard kembali ke tombol "Tambah"
    setResetKey(prev => prev + 1);
  };

  // Frontend-only operations (no API calls)
  const handleAddMenu = ({ menu_id, menu_name, price, type }) => {
    setOrders((prev) => {
      const list = prev[type];

      const existing = list.find((item) => item.menu_id === menu_id);
      let updated;

      if (existing) {
        updated = list.map((item) =>
        item.menu_id === menu_id
          ? { ...item, quantity: item.quantity + 1}
          : item
        );
      } else {
        updated = [...list, { menu_id, menu_name, price, quantity: 1}];
      }

      return {
        ...prev,
        [type] : updated,
      }
    })
  }

  // Add table update handler
  const handleUpdateTable = (newTable, customerName) => {
    setTableDetails({
      tableNum: newTable,
      personName: customerName || "default"
    });
  };

  const handleRemoveMenu = (menu_id, type) => {
    setOrders((prev) => {
      const list = prev[type];
      const updated = list.filter(item => item.menu_id !== menu_id);
      return {
        ...prev,
        [type]: updated
      };
    });
  };

  const handleUpdateQuantity = (menu_id, type, newQuantity) => {
    setOrders((prev) => {
      const list = prev[type];
      
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        const updated = list.filter(item => item.menu_id !== menu_id);
        return {
          ...prev,
          [type]: updated
        };
      } else {
        // Update quantity
        const updated = list.map(item =>
          item.menu_id === menu_id
            ? { ...item, quantity: newQuantity }
            : item
        );
        return {
          ...prev,
          [type]: updated
        };
      }
    });
  };

  const handleSaveOrders = async () => {
    setSaving(true);
    setError(false);
    
    try {
      const response = await axios.post(`${url}/api/orders/add-order`, {
        tableNum: tableDetails.tableNum,
        personName: tableDetails.personName,
        dineIn: orders.dineIn,
        takeAway: orders.takeAway,
        isPaid: true
      });

        setOrders(savedOrders);
        setSavedOrders(savedOrders);
        
        alert('Pesanan berhasil ditambah ke Antrian');

    } catch (err) {
      setError('Gagal menyimpan pesanan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };


  const handleCancelOrders = () => {
    if (hasUnsavedChanges()) {
      const confirmCancel = window.confirm('Batalkan semua perubahan yang belum disimpan?');
      if (confirmCancel) {
        setOrders(savedOrders);
      }
    }
  };

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response = await axios.get(`${url}/api/menus-category`)
        setMenus(response.data)

      } catch (err) {
        setError(err.message)
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="flex h-screen">
      {/* Konten utama */}
      <div className="flex-1 pl-7 pr-2 pt-7 pb-10 overflow-y-auto">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {loading && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">Memuat data...</div>}
      {saving && <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4">Menyimpan pesanan...</div>}
      
        {/* Render Menu dengan key untuk force re-render */}
        {menus.map((group, idx) => (
          <div key={`${idx}-${resetKey}`} className="">
            <h1 className="text-4xl font-bold mb-3">{group.kategori}</h1>
              
              <div className="flex flex-wrap flex-row">
              {group.menu.map((item, i) => (
                <ItemCard
                  key={`${item.id || i}-${resetKey}`} // KEY DENGAN resetKey - INI YANG PENTING!
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

      {/* Sidebar kanan dengan key untuk force re-render */}
      <Order 
        key={`order-${resetKey}`} // KEY UNTUK FORCE RE-RENDER ORDER COMPONENT
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
    </>
  );
}

