export default function FormConfirmOrder({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isLoading, 
    tableNumber,
    title = "Konfirmasi Hapus",
    message = "Apakah Anda yakin ingin menghapus pesanan dari",
    confirmText = "Hapus",
    cancelText = "Batal"
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
                <p className="text-gray-600 mb-6 text-center">
                    {message} Meja {tableNumber}?
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 rounded font-semibold transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded font-semibold transition-colors"
                    >
                        {isLoading ? 'Memproses...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}