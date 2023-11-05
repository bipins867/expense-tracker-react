import logo from "./logo.svg";
import "./App.css";
import Base from "./Components/Base";
import DataProvider from "./store/DataProvider";
import { useSelector } from "react-redux";

function App() {
  const body = useSelector((state) => state.theme.body);
  const text = useSelector((state) => state.theme.text);
  
  return (
    <>
      <div style={{
        backgroundColor:body,
        color:text
      }}>
        <DataProvider>
          <Base />
        </DataProvider>
      </div>
    </>
  );
}

export default App;
