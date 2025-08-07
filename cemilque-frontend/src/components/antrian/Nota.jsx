import { MdEdit } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import NotaDetails from "./NotaDetails";
import FormConfirmOrder from "../module/FormConfirmOrder";

export default function Nota({ order, onOrderUpdate, onOrderDelete }) {
    const url = `${import.meta.env.VITE_API_URL}`;

    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDeleteOrder = async () => {
        try {
            setIsLoading(true);
            // Call API to delete order
            await axios.delete(`${url}/api/orders/${order.orderId}/delete`);
            
            // Call parent callback to update UI
            onOrderDelete(order.orderId);
            
            // Close confirmation modal
            setShowConfirmDelete(false);
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Gagal menghapus pesanan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteOrder = async () => {
        try {
            setIsLoading(true);
            // Call API to mark order as complete
            const response = await axios.put(`${url}/api/orders/${order.orderId}/complete`);
            
            // Call parent callback to update UI with the updated order
            onOrderUpdate(response.data);
            window.location.reload();
            alert('Pesanan berhasil diselesaikan!');
        } catch (error) {
            console.error('Error completing order:', error);
            alert('Gagal menyelesaikan pesanan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <aside className="h-screen min-w-[375px] max-w-[375px] flex flex-col border-l border-black/30">
                {/* Header */}
                <div className="flex flex-col justify-between px-10 pt-7 w-full self-center">
                    <div className="flex flex-row justify-between pb-6">
                        <div className="flex-col">
                            <div className="table-number">
                                <h1 className="font-bold">Meja {order?.tableNum || '1'}</h1>
                            </div>
                            <div className="buyer-name text-xs">{order?.name || 'default'}</div>
                        </div>
                        <button className="flex edit-button bg-cemilque-secondary rounded-md outline-1 outline outline-black/70 flex h-6 w-6 p-1">
                            <MdEdit size={15}/>
                        </button>
                    </div>
                    <div className="border-t border-black/20"></div>
                </div>

                <nav className="overflow-y-auto flex-1">
                    {/* Order */}
                    <div className="grow">
                        <div className="dinein-part">
                            <NotaDetails 
                                tipe='Dine-In'
                                items={order?.dine_in || []}
                            />
                        </div>
                        <div className="takeaway-part">
                            <NotaDetails 
                                tipe='Take-away'
                                items={order?.take_away || []}
                            />
                        </div>
                    </div>
                </nav>

                {/* Payment */}
                <div className="flex flex-col self-end w-full px-10 pb-7">
                    <div className="border-t border-black/20 pb-6"></div>
                    <div className="payment-status outline outline-1 bg-blue-300 p-2 mb-2 rounded rounded-lg text-center">
                        <p className="text-sm font-semibold">{order?.payment || 'Unknown'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => setShowConfirmDelete(true)}
                            disabled={isLoading}
                            className="text-sm w-full bg-red-400 hover:bg-red-500 disabled:bg-red-300 disabled:cursor-not-allowed rounded rounded-md p-2 font-bold transition-colors"
                        >
                            {isLoading ? 'Menghapus...' : 'Hapus Pesanan'}
                        </button>
                        <button 
                            onClick={handleCompleteOrder}
                            disabled={isLoading}
                            className="text-sm w-full bg-cemilque-hover hover:bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed rounded rounded-md p-2 font-bold transition-colors"
                        >
                            {isLoading ? 'Memproses...' : 'Pesanan Beres'}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Confirmation Modal */}
            <FormConfirmOrder
                isOpen={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={handleDeleteOrder}
                isLoading={isLoading}
                tableNumber={order?.tableNum}
                title="Konfirmasi Hapus"
                message="Apakah Anda yakin ingin menghapus pesanan dari"
                confirmText="Hapus"
                cancelText="Batal"
            />
        </>
    );
}