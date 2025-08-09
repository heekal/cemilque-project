import { useEffect, useState } from "react";
import axios from "axios";

export default function MonitorPendapatan() {
  const url = `${import.meta.env.VITE_API_URL}`;
  const [income, setIncome] = useState("");

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response = await axios.get(`${url}/api/beranda/income`);
        setIncome(Number(response.data[0].total_profit));
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="p-7 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">Pendapatan Hari Ini</h3>
      <div className="text-3xl font-bold text-black">Rp. {income},-</div>
      <p className="text-green-600 mt-1">+12% dari kemarin</p>
    </div>
  );
}
