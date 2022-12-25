import { Routes, Route } from "react-router-dom";
import TableToCSV from "./Components/Tabletoscv";
import CsvToTable from "./Components/Csvtotable";
import Header from "./Components/Header";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<TableToCSV />} />
          <Route path="/page-2" element={<CsvToTable />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
