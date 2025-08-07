import { RiSubtractFill } from "react-icons/ri"
import { IoIosAdd } from "react-icons/io"
import "../Components.css";

export default function OrderCard({ nama, jumlah, harga, onUpdateQuantity }) {
    const handleIncrement = () => {
        onUpdateQuantity(jumlah + 1);
    };

    const handleDecrement = () => {
        onUpdateQuantity(jumlah - 1);
    };

    return (
        <div className="order-card">
            <h1 className="order-itemname">
                {nama.replace(/_/g, ' ')}
            </h1>
            <div className="order-itemedit">
                <button 
                    onClick={handleDecrement}
                    className="flex h-4 w-4 bg-button-light hover:bg-cemilque justify-center items-center rounded-sm"
                >
                    <RiSubtractFill />
                </button> 
                <span className="font-normal">{jumlah}</span> 
                <button 
                    onClick={handleIncrement}
                    className="flex h-4 w-4 bg-button-light hover:bg-cemilque place-items-center rounded-sm"
                >
                    <IoIosAdd size={20} strokeWidth={1}/>
                </button>
            </div>
                <div className="order-itemprice">
                    <h1>
                        Rp{harga.toLocaleString("id-ID")}
                    </h1>
                    <h1 className="flex justify-end text-black">
                        x {jumlah}
                    </h1>
                </div>
            <h1 className="order-itemtotal">
                Rp{(jumlah * harga).toLocaleString("id-ID")}
            </h1>
        </div>
    )
}