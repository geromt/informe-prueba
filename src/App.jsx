import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { BarLineChart } from './components/BarLineChart';
import { fetchDocumentsByYear, fetchArticlesByYear, fetchIsbnByYear, fetchProjects, fetchPatents } from './services/fetchServices';
import './App.css'
import { PatentsTable } from './components/PatentsTable';

function App() {
  const [documents, setDocuments] = useState(null)
  const [articles, setArticles] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [projects, setProjects] = useState(null)
  const [patents, setPatents] = useState(null)

  const refrestDocumentsData = () => fetchDocumentsByYear().then(setDocuments);
  const refreshArticlesData = () => fetchArticlesByYear().then(setArticles);
  const refreshIsbnData = () => fetchIsbnByYear().then(setIsbn);
  const refreshProjectsData = () => fetchProjects().then(setProjects);
  const refreshPatents = () => fetchPatents().then(setPatents);

  useEffect(() => {
    refrestDocumentsData();
    refreshArticlesData();
    refreshIsbnData();
    refreshProjectsData();
    refreshPatents();
  }, []);

  return (
    <>
      <header>
        <h2>Sistema Integral de Información Académica</h2>
      </header>
      <main>
        <h1>Facultad de Medicina</h1>
        <div>
          <button>Producción Académica</button>
          <button>Docencia</button>
          <button>Estímulos, programas, premios y reconocimientos</button>
          <button>Personal Académico</button>
        </div>
        {documents && <LinearChart title="Documentos" data={documents} />}
        {articles && <LinearChart title="Articulos" data={articles} />}
        {isbn && <LinearChart title="ISBN" data={isbn} />}
        {projects && <BarLineChart title="Proyectos" data={projects} />}
        {patents && <PatentsTable title="Patentes" data={patents} />}
      </main>
    </>
  )
}

export default App
