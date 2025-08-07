import { useState, useEffect } from "react";
import axios from "axios";
import Nota from "../components/antrian/Nota";
import QueueTable from "../components/antrian/QueueTable";

export default function Antrian() {
    const url = `${import.meta.env.VITE_API_URL}`;

    const [orders, setOrders] = useState([]);
    const [isClick, setIsClicked] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchData = async() => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/api/orders/show-all`);
                setOrders(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOrderUpdate = (updatedOrder) => {
        setOrders(prevOrders =>
            updatedOrder.status === 'completed'
                ? prevOrders.filter(order => order.orderId !== updatedOrder.orderId)
                : prevOrders.map(order =>
                    order.orderId === updatedOrder.orderId ? updatedOrder : order
                )
        );
        setSelectedOrder(null);
        setIsClicked(false);
    };

    const handleOrderDelete = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
        setIsClicked(false);
        setSelectedOrder(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="flex">
            <main className="flex-1 overflow-y-auto h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pl-7 pt-7 pb-7">
                    <h1 className="font-bold text-4xl">List Order</h1>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2 md:mt-0 mr-7">
                            <small>API Error: {error} (Using fallback data)</small>
                        </div>
                    )}
                </div>
                
                <QueueTable
                    orders={orders}
                    setIsClick={setIsClicked}
                    setSelectedOrder={setSelectedOrder}
                />
            </main>
            
            {isClick && selectedOrder && (
                <Nota 
                    order={selectedOrder}
                    onOrderUpdate={handleOrderUpdate}
                    onOrderDelete={handleOrderDelete}
                />
            )}
        </div>
    );
}