import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-white min-h-full">
      <ToastContainer />
      <Home />
    </div>
  );
}

export default App;
