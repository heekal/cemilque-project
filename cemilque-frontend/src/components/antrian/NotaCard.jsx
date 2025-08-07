export default function NotaCard({ nama, jumlah}) {
    return (
        <div className="grid grid-cols-2 gap-1 p-2 rounded-lg border border-button-light">
            <h1 className="order-itemname">
                {nama.replace(/_/g, ' ')}
            </h1>
            <span className="flex text-xs font-semibold items-center justify-end">{jumlah}</span> 
        </div>
    )
}