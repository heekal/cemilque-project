import MonitorOmset from "../components/beranda/MonitorOmset";
import MonitorItem from "../components/beranda/MonitorItem";
import MonitorKategori from "../components/beranda/MonitorKategori";
import MonitorBanyakPenjualan from "../components/beranda/MonitorBanyakPenjualan";
import MonitorPendapatan from "../components/beranda/MonitorPendapatan";

export default function Beranda (){
  return (
    <div className="h-screen overflow-hidden grid grid-cols-3 grid-rows-4 p-7 gap-5">
        <div className="row-span-2 flex items-center justify-evenly">
          <MonitorOmset />
        </div>
        <div className="row-span-2 flex items-center justify-evenly">
          <MonitorKategori />
        </div>
        <div className="darryl row-span-3 ">
          <MonitorBanyakPenjualan />
        </div>
        <div className="row-span-2 col-span-2">
          <MonitorItem />
        </div>
        <div className="darryl">
          <MonitorPendapatan />
        </div>
    </div>
  );
}


