import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function QueueTable({ orders, setIsClick, setSelectedOrder }) {
    const [chosenTable, setChosenTable] = useState(null);
    const activeOrders = orders.filter(order => order.status !== 'completed');

    // Handle case where orders might be empty
    if (!orders || orders.length === 0) {
        return (
            <div className="px-5 py-10 text-center">
                <p className="text-gray-500 text-lg">Tidak ada pesanan saat ini</p>
            </div>
        );
    }

    const handleRowClick = (row) => {
        const newValue = chosenTable === row.orderId ? null : row.orderId;
        setChosenTable(newValue);
        setIsClick(newValue !== null);
        
        // Set selected order data
        if (newValue !== null) {
            setSelectedOrder(row);
        } else {
            setSelectedOrder(null);
        }
    };

    const getPaymentStyle = (paymentStatus) => {
        const isLunas = paymentStatus === 'LUNAS';
        return {
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '15px',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            backgroundColor: isLunas ? '#63d471' : '#FA5053',
            color: isLunas ? '#233329' : '#540808'
        };
    };

    return (
        <TableContainer className="px-5">
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Nomor Meja</TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>Pembayaran</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nama</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Banyak Pesanan</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activeOrders.map((row) => {
                        const isChosen = chosenTable === row.orderId;

                        return (
                            <TableRow
                                key={`${row.orderId}-${row.tableNum}`}
                                onClick={() => handleRowClick(row)}
                                sx={{
                                    backgroundColor: isChosen ? '#d0f0c0' : 'inherit',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: isChosen ? '#d0f0c0' : '#f5f5f5'
                                    },
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    Meja {row.tableNum}
                                </TableCell>
                                <TableCell align="center">
                                    <span style={getPaymentStyle(row.payment)}>
                                        {row.payment}
                                    </span>
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.itemNum} item</TableCell>
                                <TableCell align="center">
                                    Rp {row.total?.toLocaleString('id-ID') || '0'}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}