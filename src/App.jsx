import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { BarLineChart } from './components/BarLineChart';
import { fetchDocumentsByYear, fetchArticlesByYear, fetchIsbnByYear, fetchProjects, fetchPatents } from './services/fetchServices';
import './App.css'
import siiaLogo from './assets/siia_sm.png'
import githubLogo from './assets/github.svg'
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
      <header className='w-full h-24 flex flex-row bg-transparent align-middle items-center justify-around'>
        <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank">
          <img src={siiaLogo} className="logo basis-1/4" alt="SIIA logo" />
        </a>
        <h2 className='text-center text-3xl basis-auto font-mono'>Sistema Integral de Información Académica</h2>
        <div>
          <a href="https://github.com/geromt/informe-prueba" target="_blank" className='h-24 w-24 basis-1/6'>
            <img src={githubLogo} className='w-24 h-24 p-6 hover:scale-105' alt="Github logo" />
          </a>
        </div>
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
