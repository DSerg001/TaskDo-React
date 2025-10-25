import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InProgress from "./pages/InProgress/InProgress";
import Done from "./pages/Done/Done";
import Deleted from "./pages/Deleted/Deleted";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InProgress />} />
        <Route path="/in-progress" element={<InProgress />} />
        <Route path="/done" element={<Done />} />
        <Route path="/deleted" element={<Deleted />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
