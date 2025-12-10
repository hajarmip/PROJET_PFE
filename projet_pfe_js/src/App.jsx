 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EspaceEnseignant from "./EspaceEnseignant.jsx";
import Cours from "./cours.jsx"; 
// أو "./Cours.jsx" إذا كان اسم الملف بحرف كبير

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EspaceEnseignant />} />
        <Route path="/cours" element={<Cours />} /> {/* هنا كان الخطأ */}
      </Routes>
    </Router>
  );
}

export default App;
