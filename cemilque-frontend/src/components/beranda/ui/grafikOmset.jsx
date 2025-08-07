
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {
    const url = `${import.meta.env.VITE_API_URL}`;
    
    const rawData = {
        "omset": [1000, 1200, 4000, 0],
        "minggu": ["m1", "m2", "m3", "m4"]
    };
    
    // Transform data for Recharts
    const data = rawData.minggu.map((week, index) => ({
        week: week,
        omset: rawData.omset[index]
    }));

    return(
        <div className="h-full w-full flex justify-center overflow-hidden">
            <ResponsiveContainer width="85%" height={95}>
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()}`, 'Omset']}
                        labelFormatter={(label) => `Minggu ${label + 1}`}
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="omset" 
                        stroke="#2563eb" 
                        strokeWidth={3}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#2563eb', strokeWidth: 2 }}

                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}