import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { fetchDocumentsByYear, fetchArticlesByYear, fetchIsbnByYear } from './services/fetchServices';
import './App.css'

function App() {
  const [documents, setDocuments] = useState(null)
  const [articles, setArticles] = useState(null)
  const [isbn, setIsbn] = useState(null)

  const refrestDocumentsData = () => fetchDocumentsByYear().then(setDocuments);
  const refreshArticlesData = () => fetchArticlesByYear().then(setArticles);
  const refreshIsbnData = () => fetchIsbnByYear().then(setIsbn);


  useEffect(() => {
    refrestDocumentsData();
    refreshArticlesData();
    refreshIsbnData();
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
      </main>
    </>
  )
}

export default App
