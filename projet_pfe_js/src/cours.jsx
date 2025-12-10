 import React, { useState } from "react";
import "./index.css";

export default function CoursPage() {
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [courses, setCourses] = useState([]);

  const handlePdfUpload = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleCreateCourse = () => {
    if (!courseName || !pdfFile) {
      alert("Veuillez entrer un nom et un PDF !");
      return;
    }

    const newCourse = {
      id: Date.now(),
      name: courseName,
      desc: courseDesc,
      pdf: pdfFile,
    };

    setCourses([...courses, newCourse]);

    // Clear inputs
    setCourseName("");
    setCourseDesc("");
    setPdfFile(null);
  };

  const openPdf = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  return (
    <div className="cours-container">

      <h1 className="title">📘 Gestion des Cours</h1>

      {/* CREATE COURSE SECTION */}
      <div className="card">
        <h2>Créer un cours</h2>

        <div className="form-group">
          <label>Nom du cours</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="ex: Analyse 1, Java, Algorithmique..."
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={courseDesc}
            onChange={(e) => setCourseDesc(e.target.value)}
            placeholder="Description du contenu du cours..."
          />
        </div>

        <div className="form-group">
          <label>Importer PDF</label>
          <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        </div>

        <button className="btn create" onClick={handleCreateCourse}>
          ➕ Créer le cours
        </button>
      
      </div>

    </div>
  );
}
