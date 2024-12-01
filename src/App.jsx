import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { BarLineChart } from './components/BarLineChart';
import { fetchDocumentsByYear, fetchArticlesByYear, fetchIsbnByYear, fetchProjects, fetchPatents } from './services/fetchServices';
import './App.css'
import siiaLogo from './assets/siia_sm.png'
import githubLogo from './assets/github.svg'
import facMedicina from './assets/facmedicina.jpg'
import sunSVG from './assets/sun.svg'
import moonSVG from './assets/moon.svg'
import { PatentsTable } from './components/PatentsTable';
import { useParallax } from 'react-scroll-parallax';

function App() {
  const [documents, setDocuments] = useState(null)
  const [articles, setArticles] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [projects, setProjects] = useState(null)
  const [patents, setPatents] = useState(null)
  const [mode, setMode] = useState('light')
  const [modeIcon, setModeIcon] = useState(sunSVG)
  const parallax = useParallax({
    speed: -25,
    opacity: [0.2, 0]
  });

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

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setModeIcon(moonSVG);
    } else {
      setMode('light');
      setModeIcon(sunSVG);
    }
  }

  const colors = ['#AF2BBF', "#51CB20", "#E4572E", "#773344", "#DA3E52"]

  return (
    <div className={mode}>
      <header className='w-full h-24 flex flex-row bg-transparent align-middle items-center justify-around absolute z-50'>
        <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank">
          <img src={siiaLogo} className="logo basis-1/4" alt="SIIA logo" />
        </a>
        <h2 className='text-center text-2xl basis-auto font-mono text-dark-secondary'>Sistema Integral de Información Académica</h2>
        <div className='basis-1/6 flex flex-row'>
          <a href="https://github.com/geromt/informe-prueba" target="_blank" className='h-24 w-24'>
            <img src={githubLogo} className='w-24 h-24 p-6 hover:scale-105' alt="Github logo" />
          </a>
          <button className='h-24 w-24 bg-transparent hover:border-0' onClick={toggleMode}>
            <img src={modeIcon} className='w-full h-full hover:scale-105' alt="Mode switcher" />
          </button>
        </div>
      </header>
      <main>
        <div className="relative h-screen flex flex-row items-center justify-between">
          <img ref={parallax.ref} src={facMedicina} className="absolute w-full h-full object-cover" alt="Facultad de Medicina" />
          <h1 className='basis-full text-dark-primary font-bold text-7xl'>Facultad de Medicina</h1>
          <div className='flex flex-col basis-80 h-2/3 justify-center z-10 right-0 flex-initial'>
            <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank" 
            className='transition inline-flex items-center justify-center bg-white/5 h-24 font-bold rounded-sm 
            text-dark-secondary line-clamp-2 font-sans text-sm border-y-2 border-dark-secondary/10 
            hover:text-dark-primary hover:bg-dark-primary/5 hover:scale-x-105 duration-300'>Producción Académica</a>
            <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank" 
            className='transition inline-flex items-center justify-center bg-white/5 h-24 font-bold rounded-sm 
            text-dark-secondary line-clamp-2 font-sans text-sm border-y-2 border-dark-secondary/10 
            hover:text-dark-primary hover:bg-dark-primary/5 hover:scale-x-105 duration-300'>Docencia</a>
            <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank" 
            className='transition inline-flex items-center justify-center bg-white/5 h-24 font-bold rounded-sm 
            text-dark-secondary line-clamp-2 font-sans text-sm border-y-2 border-dark-secondary/10 
            hover:text-dark-primary hover:bg-dark-primary/5 hover:scale-x-105 duration-300'>Estímulos, programas, premios y reconocimientos</a>
            <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank" 
            className='transition inline-flex items-center justify-center bg-white/5 h-24 font-bold rounded-sm 
            text-dark-secondary line-clamp-2 font-sans text-sm border-y-2 border-dark-secondary/10 
            hover:text-dark-primary hover:bg-dark-primary/5 hover:scale-x-105 duration-300'>Personal Académico</a>
          </div>
        </div>
        
        <div className='h-96 bg-[#242424] dark:bg-dark-background'></div>
        {documents && <LinearChart title="Documentos" data={documents} colors={colors}/>}
        {articles && <LinearChart title="Articulos" data={articles} colors={colors}/>}
        {isbn && <LinearChart title="ISBN" data={isbn} colors={colors}/>}
        {projects && <BarLineChart title="Proyectos" data={projects} />}
        {patents && <PatentsTable title="Patentes" data={patents} />}
      </main>
    </div>
  )
}

export default App
