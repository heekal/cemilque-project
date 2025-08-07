import NotaCard from "./NotaCard";
import "../Components.css";

export default function NotaDetails({ tipe, items }) {
  // Handle case where items might be undefined or empty
  if (!items || items.length === 0) {
    return (
      <nav className="orderdetails-box">
        <nav className="orderdetails-grid">
          <div className="orderdetails-title">
            <span className="font-bold">{tipe}</span>
          </div>
          <div className="orderdetails-lists">
            <div className="text-gray-500 text-sm">Tidak ada pesanan</div>
          </div>
        </nav>
      </nav>
    );
  }

  return (
    <nav className="orderdetails-box">
      <nav className="orderdetails-grid">
        <div className="orderdetails-title">
          <span className="font-bold">{tipe}</span>
        </div>
        <div className="orderdetails-lists">
          {items.map((item, index) => {
            const itemName = Object.keys(item)[0];
            const itemData = Object.values(item)[0];
            const jumlah = itemData?.[0]?.jumlah || 0;
            
            return (
              <NotaCard
                key={`${itemName}-${index}`}
                nama={itemName}
                jumlah={jumlah}
              />
            );
          })}
        </div>
      </nav>
    </nav>
  );
}