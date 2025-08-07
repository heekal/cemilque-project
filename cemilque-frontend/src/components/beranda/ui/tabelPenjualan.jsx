import { useEffect, useState } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";

export default function TabelPenjualan() {
  const [orders, setOrders] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`${url}/api/beranda/get-top`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching top 5', err);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ background: '#88E788'}}>
            <TableCell sx={{ fontWeight: 'bold', color: '#05472A'}}>Makanan Favorit Hari Ini</TableCell>
            <TableCell align='center' sx={{ fontWeight: 'bold', color: '#05472A'}}>Jumlah Terjual</TableCell>
            <TableCell align='center' sx={{ fontWeight: 'bold', color: '#05472A'}}>Omset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row, index) => {
            const { menu_name, quantity, omset } = row;
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{menu_name}</TableCell>
                <TableCell component="th" scope="row" align='center'>{quantity}</TableCell>
                <TableCell component="th" scope="row" align='center'>{omset}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}