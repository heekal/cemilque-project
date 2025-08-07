import TabelPenjualan from "./ui/tabelPenjualan";

export default function MonitorItem() {
    return(
        <div className="h-full w-full">
            <div className="row-span-4 border border-gray-500 rounded-3xl overflow-hidden">
                <div className="h-full w-full">
                    <TabelPenjualan />
                </div>
            </div>
        </div>
    );
}