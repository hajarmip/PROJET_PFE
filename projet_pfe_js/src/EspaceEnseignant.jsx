 import "./index.css";
 import { Link } from "react-router-dom";


export default function Dashboard() {
    return (
        <div className="layout">

            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="sidebar-title">Espace Enseignant</h2>

                <ul className="menu">
                    <li> <Link to="/cours">📤 Créer Cours</Link></li>
                     
                    <li><a href="#">📝 Modifier CV</a></li>
                    <li><a href="#">📊 Statistiques</a></li>
                    <li><a href="#">⚙️ Paramètres</a></li>
                    <li><a href="#">  ¤¤ ¤¤ live </a></li>
                </ul>
            </aside>

            {/* Main */}
            <div className="main">

                {/* Header */}
                <header className="header">
                    <button
                        className="hamburger"
                        onClick={() => {
                            document.querySelector(".sidebar").classList.toggle("open");
                        }}
                    >☰</button>

                    <h1 className="title">Dashboard Enseignant</h1>
                </header>

                {/* Content */}
                <main className="content">

                    {/* Cards */}
                    <div className="cards">
                        <div className="card">
                            <h3>Nombre d’étudiants</h3>
                            <p>1,250</p>
                        </div>

                        <div className="card">
                            <h3>Cours actifs</h3>
                            <p>8</p>
                        </div>

                        <div className="card">
                            <h3>Tests à corriger</h3>
                            <p>15</p>
                        </div>
                    </div>

                    {/* Courses */}
                    <div className="box">
                        <h2>Cours Récents</h2>

                        <div className="course-item">
                            <span>Mathématiques — Chapitre 4 publié</span>
                            <small>Il y a 2 heures</small>
                        </div>

                        <div className="course-item">
                            <span>Physique — Nouveau Quiz ajouté</span>
                            <small>Il y a 5 heures</small>
                        </div>

                        <div className="course-item">
                            <span>Analyse — Cours mis à jour</span>
                            <small>Hier</small>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="box">
                        <h2>Statistiques Étudiants</h2>

                        <ul className="stats">
                            <li><strong>92%</strong> taux de réussite</li>
                            <li><strong>78%</strong> présence aux cours</li>
                            <li><strong>12%</strong> étudiants à risque</li>
                        </ul>
                    </div>

                </main>
            </div>
        </div>
    );
}
