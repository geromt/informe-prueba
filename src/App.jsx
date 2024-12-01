import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { BarLineChart } from './components/BarLineChart';
import { MainButton } from './components/MainButton';
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
  const [graficasScrollValue, setGraficasScrollValue] = useState(0)
  const parallax = useParallax({
    speed: -25,
    opacity: [0.25, 0]
  });

  const refrestDocumentsData = (sex=null) => fetchDocumentsByYear(sex).then(data => {
    console.log(data);
    setDocuments(data)});
  const refreshArticlesData = (sex=null) => fetchArticlesByYear(sex).then(setArticles);
  const refreshIsbnData = (sex=null) => fetchIsbnByYear(sex).then(setIsbn);
  const refreshProjectsData = (sex=null) => fetchProjects(sex).then(setProjects);
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
      document.getElementById("root").style["background-color"] = '#242424';
      document.getElementById("root").style["color"] = '#D9FAFF';
    } else {
      setMode('light');
      setModeIcon(sunSVG);
      document.getElementById("root").style["background-color"] = '#F8F4E3';
      document.getElementById("root").style["color"] = '#090909';      
    }
  }

  const handleScroll = event => {
    const scrollPosition = event.target.scrollTop;
    const bodyScrollPos = document.documentElement.scrollTop;
    const maxScrollPos = document.documentElement.scrollHeight - document.getElementById("main-screen").clientHeight;
    if (scrollPosition > graficasScrollValue && bodyScrollPos < maxScrollPos) {
      event.target.scrollTop = graficasScrollValue;
      const deltaScroll = graficasScrollValue - scrollPosition;
      document.documentElement.scrollTop -= deltaScroll;
    } else{
      setGraficasScrollValue(scrollPosition);
    }
  }

  const handleSexSelection = (sex, chartName) => {
    const sexParam = (sex == "M" || sex == "F") ? sex : null;
    switch (chartName) {
      case 'Documentos':
        refrestDocumentsData(sexParam);
        break;
      case "Artículos":
        refreshArticlesData(sexParam);
        break;
      case "ISBN":
        refreshIsbnData(sexParam);
        break;
      case "Projects":
        refreshProjectsData(sexParam);
        break;
      default:
        console.log("Invalid Chart Name");
    }
  }

  const colors = ['#8A0094',"#00FFC4", "#FF4B14", "#FC6DAB", "#08B2E3"]

  return (
    <div id="parent" className={mode}>
      <header className='w-full h-24 flex flex-row bg-transparent align-middle items-center justify-around absolute z-50'>
        <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank">
          <img src={siiaLogo} className="logo basis-1/4" alt="SIIA logo" />
        </a>
        <h2 className='text-center text-2xl basis-auto font-mono text-white-secondary dark:text-dark-secondary'>Sistema Integral de Información Académica</h2>
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
        <div id="main-screen" className="relative h-screen flex flex-row items-center justify-between">
          <img ref={parallax.ref} src={facMedicina} className="absolute w-full h-full object-cover" alt="Facultad de Medicina" />
          <h1 className='basis-full text-white-secondary underline dark:text-dark-primary font-bold text-7xl'>Facultad de Medicina</h1>
          <div className='flex flex-col basis-80 h-2/3 justify-center z-10 right-0 flex-initial'>
            <MainButton text="Producción Académica" />
            <MainButton text="Docencia" />
            <MainButton text="Estímulos, programas, premios y reconocimientos" />
            <MainButton text="Personal Académico" />
          </div>
        </div>
        
        <div className='h-96 bg-white-background dark:bg-dark-background'></div>
        <div onScroll={handleScroll} id="snap-scroll" className='w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll sticky remove-scroll'>
          {documents && <LinearChart title="Documentos" data={documents} colors={colors} onSexSelected={handleSexSelection}/>}
          {articles && <LinearChart title="Artículos" data={articles} colors={colors} onSexSelected={handleSexSelection}/>}
          {isbn && <LinearChart title="ISBN" data={isbn} colors={colors} onSexSelected={handleSexSelection}/>}
          {projects && <BarLineChart title="Proyectos" data={projects} />}
          {patents && <PatentsTable title="Patentes" data={patents} />}
        </div>
      </main>
    </div>
  )
}

export default App
