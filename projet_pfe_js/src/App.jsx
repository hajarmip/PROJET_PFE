  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register.jsx";
import EspaceEnseignant from "./EspaceEnseignant.jsx";
import Cours from "./cours.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية → Register */}
        <Route path="/" element={<Register />} />

        {/* باقي الصفحات */}
        <Route path="/enseignant" element={<EspaceEnseignant />} />
        <Route path="/cours" element={<Cours />} />
      </Routes>
    </Router>
  );
}

export default App;

