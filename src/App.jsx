import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
