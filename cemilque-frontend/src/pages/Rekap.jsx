  import TableList from "../components/rekap/Tabelist";
  import Charts from "../components/rekap/Chart";
  import LineChartHari from "../components/rekap/Line-chart";

  const Rekap = () => {

    return (
      <div className="h-screen overflow-auto">
        <div className="flex flex-col gap-5">
          <Charts />
          <LineChartHari />
          <TableList />
        </div>
      </div>
    );
  };

  export default Rekap;
