import "./App.css";
import TttProvider from "./context/TttContext";
import Board from "./components/Board";
import Menu from "./components/Menu";

function App()
{
  return (
    <TttProvider>
      <div className="app">
        <Menu />
      </div>
    </TttProvider>
  );
}

export default App;
