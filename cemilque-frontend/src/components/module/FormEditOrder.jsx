// FormEditOrder.jsx
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function FormEditOrder({ currentTable, onClose, onSave }) {
  const [tableNumber, setTableNumber] = useState(currentTable);
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(tableNumber, customerName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Nomor Meja</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <RxCross2 size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableNum">
              Nomor Meja
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tableNum"
              type="number"
              min="1"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
              Nama Pelanggan (opsional)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama pelanggan"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-cemilque hover:bg-cemilque-dark text-white font-bold py-2 px-4 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}