import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { AreaChartComponent } from './components/AreaChart';
import { fetchDocumentsByYear } from './services/fetchServices';
import './App.css'

function App() {
  const [documents, setDocuments] = useState(null)

  const refrestDocumentsData = () => {
    fetchDocumentsByYear().then(data => {
      console.log(data);
      setDocuments(data)
  })};

  useEffect(refrestDocumentsData, []);

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
      </main>
    </>
  )
}

export default App
