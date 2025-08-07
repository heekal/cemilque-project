import Chart from "./ui/grafikOmset";

export default function MonitorOmset() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#5FD490] to-green-300 rounded-3xl grid grid-rows-3 grid-cols-2 shadow-xl shadow-stone-300 overflow-auto">
      
      {/* header */}
      <div className="col-span-2 flex flex-col justify-center px-7 pt-3 pb-1">
        <div>
          <h1 className="text-lg font-semibold tracking-wide mb-2 text-white">Pendapatan Minggu Ini</h1>
        </div>
        <div className="flex flex-row">
          <h1 className="font-normal text-lg text-white">Rp</h1>
          <h1 className="font-bold text-5xl text-white ml-2">7.000.000,-</h1>
        </div>
      </div>

      {/* graph */}
      <div className="col-span-2 px-6">
        <div className="pt-2 rounded-xl min-h-[110px] max-h-[110px] bg-white shadow-inner bg-#5FD491" style={{boxShadow: 'inset 2px 2px 15px rgba(0, 0, 0, 0.25)'}}>
         <Chart />
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col justify-center pt-1 pl-7">
        {/* graph X-line */}
        <div className="flex flex-row justify-evenly gap-4 font-semibold text-green-500">
          <div className="bg-white px-1 rounded-lg shadow">M1</div>
          <div className="bg-white px-1 rounded-lg shadow">M2</div>
        </div>
        <div className="py-2">
          <div>
            <h1 className="text-sm font-normal mb-1 text-white">kotor</h1>
          </div>
          <div className="">
            <h1 className="text-xl font-bold text-white">10.000.000</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center pt-1 pr-7">
        {/* graph X-line */}
        <div className="flex flex-row justify-evenly gap-4 font-semibold text-green-500">
          <div className="bg-white px-1 rounded-lg shadow">M3</div>
          <div className="bg-white px-1 rounded-lg shadow">M4</div>
        </div>
        <div className="py-2 text-right ">
          <div>
            <h1 className="text-sm font-normal mb-1 text-white">HPP</h1>
          </div>
          <div>
            <h1 className=" text-xl font-bold text-white">3.000.000</h1>
          </div>
        </div>
      </div>
    
    </div>
  );
}
