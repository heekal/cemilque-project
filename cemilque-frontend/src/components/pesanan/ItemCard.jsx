import { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";

const ItemCard = ({ 
  menu_id, 
  url, 
  nama, 
  harga, 
  onAddMenu, 
  currentOrders, 
  onRemoveMenu, 
  disabled = false,
  resetTrigger // SOLUSI 3: Reset trigger prop
}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState({
        dineIn: false,
        takeAway: false
    });

    // SOLUSI 3: Reset state ketika resetTrigger berubah
    useEffect(() => {
        if (resetTrigger) {
            setIsAdded(false);
            setSelectedTypes({
                dineIn: false,
                takeAway: false
            });
        }
    }, [resetTrigger]);

    // Check if item is already in orders
    useEffect(() => {
        const inDineIn = currentOrders.dineIn.some(item => item.menu_id === menu_id);
        const inTakeAway = currentOrders.takeAway.some(item => item.menu_id === menu_id);
        
        setIsAdded(inDineIn || inTakeAway);
        setSelectedTypes({
            dineIn: inDineIn,
            takeAway: inTakeAway
        });
    }, [currentOrders, menu_id]);

    const handleFirstAdd = () => {
        setIsAdded(true);
    };

    const handleTypeToggle = (type) => {
        const orderType = type === 'dineIn' ? 'dineIn' : 'takeAway';
        
        if (selectedTypes[type]) {
            // Remove from this type
            onRemoveMenu(menu_id, orderType);
        } else {
            // Add to this type
            onAddMenu({
                menu_id,
                menu_name: nama,
                price: harga,
                type: orderType
            });
        }
    };

    const handleRemoveAll = () => {
        // Remove from both types
        if (selectedTypes.dineIn) {
            onRemoveMenu(menu_id, 'dineIn');
        }
        if (selectedTypes.takeAway) {
            onRemoveMenu(menu_id, 'takeAway');
        }
    };

    return (
        <div className="mr-2 flex flex-col mb-2 min-w-[270px] max-w-[270px] h-[300px] bg-white rounded-lg shadow-md outline outline-1 outline-button-dark/50"> 
            {/* Gambar Makanan */}
            <div className="flex justify-center items-center h-[175px] ">
                <div className="h-[155px] w-[250px] min-w-[225px] rounded-lg overflow-hidden outline outline-1 outline-button-dark/75">
                    <img
                    className="w-full h-full object-cover object-center"
                    src={url}
                    alt={nama}
                    />
                </div>
            </div>

            {/* Nama & Harga */}
            <div className="flex flex-col px-4 gap-1">
                <div className="text-md font-semibold text-black pb-2">{nama}</div>
                <div className="text-green-600 text-sm font-bold">Rp. {harga}</div>
            </div>

            {/* Tombol Take-Away & Dine-In */}
            <div className="flex justify-center items-center px-4 mt-auto pb-4 gap-2">
                {!isAdded ? (
                    <button
                        onClick={handleFirstAdd}
                        disabled={disabled}
                        className={`inset-y-0 bg-gray-200 text-black text-sm font-bold py-2 px-10 rounded-3xl transition-all
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cemilque-hover'}
                        `}
                    >
                        Tambah
                    </button>
                    ) : (
                    <>
                        <button 
                            onClick={() => handleTypeToggle('takeAway')}
                            disabled={disabled}
                            className={`text-sm py-1 px-3 rounded-3xl font-semibold transition-all
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${ 
                                selectedTypes.takeAway 
                                    ? "bg-cemilque-hover text-white hover:bg-red-400 hover:text-black"
                                    : "bg-gray-200 text-black hover:bg-cemilque-hover hover:text-white"
                            }`}
                        >
                            Take-Away
                        </button>
                        <button 
                            onClick={() => handleTypeToggle('dineIn')}
                            disabled={disabled}
                            className={`text-sm py-1 px-3 rounded-3xl font-semibold transition-all
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${ 
                                selectedTypes.dineIn 
                                    ? "bg-cemilque-hover text-white hover:bg-red-400 hover:text-black"
                                    : "bg-gray-200 text-black hover:bg-cemilque-hover hover:text-white"
                            }`}
                        >
                            Dine-in
                        </button>
                        <button
                            onClick={handleRemoveAll}
                            disabled={disabled}
                            className={`p-2 bg-red-400 rounded-xl transition-all
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-300'}
                            `}
                        >
                            <FaTrashCan size={13} />
                        </button>
                    </>
                )}
            </div>         
        </div>
    )
}

export default ItemCard;

