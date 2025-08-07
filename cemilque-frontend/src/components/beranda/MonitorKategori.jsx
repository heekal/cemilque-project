import CategoryPie from "./ui/pieKategori";

export default function MonitorKategori() {
    return(
        <div className="h-full w-full bg-white rounded-3xl shadow-lg">
            <div className="flex items-center justify-center  px-7">
                <div className="w-full flex flex-col pt-3">
                    <div className="px-2 pt-2">
                        <h1 className="text-xl font-semibold pb-4">Makanan terpopuler</h1>
                    </div>
                    <div className="border-b border-gray-300 shadow"></div>
                </div>
            </div>
            <div className="overflow-hidden">
                    <CategoryPie />
            </div>
        </div>
    );
}