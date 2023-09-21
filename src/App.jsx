import { Toaster } from "sonner";
import "./App.css";
import { Counter } from "./components/Counter";

function App() {
  return (
    <>
      <Toaster richColors position="bottom-left" />
      <Counter />
    </>
  );
}

export default App;
