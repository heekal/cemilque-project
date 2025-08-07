import { MdEdit } from "react-icons/md";
import { RxCross2, RxCheck } from "react-icons/rx";
import { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import FormEditOrder from "../module/FormEditOrder";
import "../Components.css";

export default function Order({ 
  orders, 
  onUpdateQuantity, 
  onSaveOrders, 
  onCancelOrders, 
  saving, 
  hasUnsavedChanges,
  tableNumber,
  onUpdateTable,
  resetTrigger // SOLUSI 3: Reset trigger prop
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [newCustomerName, setCustomerName] = useState("Abang / Teteh");

  // SOLUSI 3: Reset state ketika resetTrigger berubah
  useEffect(() => {
    if (resetTrigger) {
      setShowEditForm(false);
      setCustomerName("Abang / Teteh");
    }
  }, [resetTrigger]);

  const handleUpdateTable = (newTable, customerName) => {
    onUpdateTable(newTable, customerName);
    setCustomerName(customerName);
    setShowEditForm(false);
  };

  // Calculate totals
  const calculateTotal = () => {
    const dineInTotal = orders.dineIn.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const takeAwayTotal = orders.takeAway.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return dineInTotal + takeAwayTotal;
  };

  const calculateTotalItems = () => {
    const dineInItems = orders.dineIn.reduce((sum, item) => sum + item.quantity, 0);
    const takeAwayItems = orders.takeAway.reduce((sum, item) => sum + item.quantity, 0);
    return dineInItems + takeAwayItems;
  };

  // Don't render if no orders
  const hasOrders = orders.dineIn.length > 0 || orders.takeAway.length > 0;
  
  if (!hasOrders) {
    return (
      <aside className="rekappesanan-box h-screen flex flex-col max-w-[400px] min-w-[330px]">
        <nav className="rekappesanan-title-box self-center w-full">
          <nav className="rekappesan-title-grid">
            <div className="rekappesanan-nomor-meja">
              <h1 className="font-bold">Meja {tableNumber}</h1>
              <span className="text-xs">{newCustomerName}</span>
            </div>
            <button 
              className="rekappesan-edit-nomor-meja" 
              onClick={() => setShowEditForm(true)}>
              <MdEdit size={15} />
            </button>
          </nav>
          <div className="divider shadow"></div>
        </nav>
        
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Belum ada pesanan</p>
        </div>
      {showEditForm && (
        <FormEditOrder 
          currentTable={tableNumber}
          onClose={() => setShowEditForm(false)}
          onSave={handleUpdateTable}
        />
      )}
      </aside>
    );
  }

  return (
    <aside className="rekappesanan-box h-screen flex flex-col max-w-[400px] min-w-[400px] relative">
      <nav className="rekappesanan-title-box self-center w-full">
        <nav className="rekappesan-title-grid">
          <div className="rekappesanan-nomor-meja">
            <h1 className="font-bold">Meja {tableNumber}</h1>
            <span className="text-xs">{newCustomerName}</span>
          </div>
          <button 
            className="rekappesan-edit-nomor-meja"
            onClick={() => setShowEditForm(true)}
          >
            <MdEdit size={15} />
          </button>
        </nav>
        <div className="divider shadow"></div>
      </nav>
      <div className="overflow-y-auto flex-1">
        {/* Dine-In Orders */}
        {orders.dineIn.length > 0 && orders.dineIn.map((item, index) => (
          <OrderDetails
            key={`dinein-${item.menu_id}`}
            tipe="Dine-In"
            nama={item.menu_name}
            jumlah={item.quantity}
            harga={item.price}
            showLabel={index === 0}
            onUpdateQuantity={(newQuantity) => onUpdateQuantity(item.menu_id, 'dineIn', newQuantity)}
          />
        ))}

        {/* Take-Away Orders */}
        {orders.takeAway.length > 0 && orders.takeAway.map((item, index) => (
          <OrderDetails
            key={`takeaway-${item.menu_id}`}
            tipe="Take-Away"
            nama={item.menu_name}
            jumlah={item.quantity}
            harga={item.price}
            showLabel={index === 0}
            onUpdateQuantity={(newQuantity) => onUpdateQuantity(item.menu_id, 'takeAway', newQuantity)}
          />
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-auto w-full">
        <div className="flex flex-col px-10 pb-7">
          <div className="divider pb-2"></div>
          <div className="font-semibold text-xs pb-2 grid grid-cols-2">
            <h1>Banyak</h1>
            <h1 className="text-right">{calculateTotalItems()}</h1>
          </div>
          <div className="flex flex-row justify-evenly gap-2">
            <div className="p-2 text-[15px] left-0 grid grid-cols-2 bg-yellow-100 rounded-md shadow-lg border border-button-dark">
              <h1 className="font-semibold">Total :</h1>
              <h1 className="pr-2 text-right font-semibold">Rp{calculateTotal().toLocaleString("id-ID")}</h1>
            </div>

            {/* Tombol Batal */}
            <div className={`group ${!hasUnsavedChanges || saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-300'} bg-red-400 border border-white hover:border-button-dark content-center px-3 rounded-xl`}>
              <div
                className="absolute
                  -translate-y-6
                  rounded-md px-3 py-1
                  bg-red-600 text-white text-sm invisible opacity-0
                  transition-all duration-150
                  -ml-6
                  group-hover:visible
                  group-hover:opacity-100
                  group-hover:-translate-y-12"
              >
                Batal
              </div>
              <button 
                onClick={onCancelOrders}
                disabled={!hasUnsavedChanges || saving}
                className="flex"
              >
                <RxCross2 size={15} className="items-center"/>
              </button>
            </div>
            
            {/* Tombol Simpan */}
            <div className={`group ${!hasUnsavedChanges || saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cemilque-hover'} bg-cemilque-secondary border border-white hover:border-button-dark px-3 rounded-xl content-center items-center`}>
              <div
                className="absolute
                  -translate-y-6
                  rounded-md px-3 py-1
                  bg-cemilque text-white text-sm invisible opacity-0
                  transition-all duration-150
                  -ml-8
                  group-hover:visible 
                  group-hover:opacity-100 
                  group-hover:-translate-y-12"
              >
                Simpan
              </div>
              <button 
                onClick={onSaveOrders}
                disabled={!hasUnsavedChanges || saving}
                className="flex  justify-center"
              >
                <RxCheck size={18} className="item-center"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Render the form when needed */}
      {showEditForm && (
        <FormEditOrder 
          currentTable={tableNumber}
          onClose={() => setShowEditForm(false)}
          onSave={handleUpdateTable}A
        />
      )}
    </aside>
  );
}

