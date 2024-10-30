import "./App.css";
import { Title } from "./components/titleName";
import { ShowCard } from "./components/showCard";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

function App() {
  const [locations, setLocations] = useState([]);
  const [locationsSearch, setLocationsSearch] = useState("");

  const getLocationData = async (locationname) => {
    try {
      const result = await axios.get(
        "http://127.0.0.1:4001/trips?keywords=" + locationname
      );
      setLocations(result.data.data); // อัปเดตข้อมูล locations
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debounceSearch = useCallback(
    debounce((name) => getLocationData(name), 600),
    []
  );

  const handlingSearchOnChange = (event) => {
    setLocationsSearch(event.target.value);
    debounceSearch(event.target.value);
  };

  useEffect(() => {
    getLocationData(""); // เรียกข้อมูลเริ่มต้น
  }, []);

  return (
    <div className="App flex flex-col items-center">
      {/* Start coding here */}
      <div className="flex flex-col items-center mt-8 w-[80%]">
        <Title />
        <div className="flex flex-row justify-start w-full">
          <h1>ค้นหาที่เที่ยว</h1>
        </div>
        <input
          type="text"
          value={locationsSearch}
          onChange={handlingSearchOnChange}
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="border p-2 rounded-lg mt-2 w-full text-center"
        />

        {/* แสดง ShowCard สำหรับแต่ละ location พร้อมแอนิเมชัน */}
        <div className="mt-4 w-full space-y-4">
          {locations.map((location, index) => (
            <ShowCard key={index} message={location} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
