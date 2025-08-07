import { Routes, Route } from "react-router"
import Navigasi, { NavigasiTujuan } from "./components/Navigasi"
import Pesanan from "./pages/Pesanan"
import Beranda from "./pages/Beranda"
import Rekap from "./pages/Rekap"
import Penyimpanan from "./pages/Penyimpanan"
import Antrian from "./pages/Antrian"
import { FaHome, FaShoppingCart } from "react-icons/fa"
import { FaBook, FaPeopleGroup } from "react-icons/fa6"
import { MdStorage } from "react-icons/md"

function App() {
  return (
      <div className="flex">
        {/* sidebar */}
        <Navigasi>
          <NavigasiTujuan icon={<FaHome size={20} />} text="Beranda" path="/" />
          <NavigasiTujuan icon={<FaShoppingCart size={20} />} text="Pesanan" path="/pesanan" />
          <NavigasiTujuan icon={<FaPeopleGroup size={20} />} text="Antrian" path="/antrian" />
          <NavigasiTujuan icon={<FaBook size={20} />} text="Rekap" path="/rekap" alert />
          <NavigasiTujuan icon={<MdStorage size={20} />} text="Penyimpanan" path="/penyimpanan" alert />
        </Navigasi>

        {/* main content */}
        <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/pesanan" element={<Pesanan />} />
              <Route path="/antrian" element={<Antrian />} />
              <Route path="/rekap" element={<Rekap />} />
              <Route path="/penyimpanan" element={<Penyimpanan />} />
            </Routes>
        </main>
      </div>
  )
}

export default App
