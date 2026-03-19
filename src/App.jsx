import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InProgress from "./pages/InProgress/InProgress";
import Done from "./pages/Done/Done";
import Deleted from "./pages/Deleted/Deleted";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/in-progress" replace />} />
        <Route path="/in-progress" element={<InProgress />} />
        <Route path="/done" element={<Done />} />
        <Route path="/deleted" element={<Deleted />} />
        <Route path="*" element={<Navigate to="/in-progress" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
