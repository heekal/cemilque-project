  import TableList from "../components/rekap/Tabelist";
  import GrafikPenjualanProduk from "../components/rekap/GrafikPenjualanProduk";
  import GrafikPenjualanMingguan from "../components/rekap/GrafikPenjualanMingguan";

  const Rekap = () => {
    return (
      <div className="h-screen overflow-y-auto pl-7 pt-7 pr-7 pb-7">
        <div className="flex flex-col gap-5">
          <GrafikPenjualanProduk />
          <GrafikPenjualanMingguan />
          <TableList />
        </div>
      </div>
    );
  };

  export default Rekap;
