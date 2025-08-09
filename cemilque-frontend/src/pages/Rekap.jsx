import TableList from "../components/rekap/Tabelist";
import GrafikPenjualanProduk from "../components/rekap/GrafikPenjualanProduk";
import GrafikPenjualanMingguan from "../components/rekap/GrafikPenjualanMingguan";

export default function Rekap () {
  return (
    <div className="flex flex-col h-screen overflow-y-auto pl-7 pt-7 pr-7 pb-7">
      <h1 className="font-bold text-4xl pb-5">Terjual Hari Ini:</h1>
      <div className="flex flex-col gap-5 pb-7">
        <GrafikPenjualanProduk />
        {/* <GrafikPenjualanMingguan /> */}
      </div>
      <h1 className="font-bold text-4xl pb-5">Terjual Minggu Ini:</h1>
      <TableList />
    </div>
  );
};
