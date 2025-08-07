import OrderCard from "./OrderCard"
import "../Components.css";

export default function OrderDetails({ tipe, nama, jumlah, harga, showLabel, onUpdateQuantity }) {
  return (
    <nav className="orderdetails-box">
      <nav className="orderdetails-grid">
        {showLabel && (
          <div className="orderdetails-title">
            <span className="font-bold">{tipe}</span>
          </div>
        )}
        <div className="orderdetails-lists">
          <OrderCard
            nama={nama}
            jumlah={jumlah}
            harga={harga}
            onUpdateQuantity={onUpdateQuantity}
          />
        </div>
      </nav>
    </nav>
  );
}