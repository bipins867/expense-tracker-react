import logo from "./logo.svg";
import "./App.css";
import Base from "./Components/Base";
import DataProvider from "./store/DataProvider";
function App() {
  return (
    <>
      <DataProvider>
        <Base />
      </DataProvider>
    </>
  );
}

export default App;
