import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";

export default function CategoryPie() {
  const url = `${import.meta.env.VITE_API_URL}`;
  const [sold, setSold] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/beranda/get-top-category`);
        setSold(response.data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    fetchData();
  }, []);

  const pieData = sold.map((item, index) => ({
    id: index,
    value: item.total_quantity, // pastikan tipe number
    label: item.menu_category
  }));

  const settings = {
    margin: {bottom: 40},
    width: 300,
    height: 300,
    hideLegend: true
  };

  return (
    <PieChart
      series={[{ 
        data: pieData, 
        innerRadius: 40, 
        outerRadius: 90, 
        arcLabel: 'value' 
      }]}
      {...settings}
    />
  );
}
