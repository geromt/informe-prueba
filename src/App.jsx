import { useEffect, useState } from 'react';
import { LinearChart } from './components/LinearChart'
import { BarLineChart } from './components/BarLineChart';
//import { MainButton } from './components/MainButton';
import { 
  fetchDocuments, 
  fetchArticles, 
  fetchIsbn, 
  fetchHumanindex, 
  fetchProjects, 
  fetchPatents, 
  fetchPatentsSection,
  fetchParticipacionesProjects } from './services/fetchServices';
import './App.css'
import siiaLogo from './assets/siia_sm.png'
import githubLogo from './assets/github.svg'
import facMedicina from './assets/facmedicina.jpg'
import sunSVG from './assets/sun.svg'
import moonSVG from './assets/moon.svg'
import { PatentsTable } from './components/PatentsTable';
import { useParallax } from 'react-scroll-parallax';
import { Modal } from './components/Modal';
import { PatentsSwitchChart } from './components/PatentsSwithChart';
import { Button } from 'flowbite-react';

function App() {
  const [documents, setDocuments] = useState(null)
  const [articles, setArticles] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [humanindex, setHumanindex] = useState(null)
  const [projects, setProjects] = useState(null)
  const [participacionesProjects, setParticipacionesProjects] = useState(null)
  const [patents, setPatents] = useState(null)
  const [patentsSections, setPatentsSections] = useState(null)
  const [mode, setMode] = useState('light')
  const [modeIcon, setModeIcon] = useState(moonSVG)
  const [graficasScrollValue, setGraficasScrollValue] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const parallax = useParallax({
    speed: -25,
    opacity: [0.25, 0]
  });

  const refrestDocumentsData = (sex=null, timeLapse="year") => fetchDocuments(sex, timeLapse).then(setDocuments);
  const refreshArticlesData = (sex=null, timeLapse="year") => fetchArticles(sex, timeLapse).then(setArticles);
  const refreshIsbnData = (sex=null, timeLapse="year") => fetchIsbn(sex, timeLapse).then(setIsbn);
  const refrestHumanIndex = (sex=null, timeLapse="year") => fetchHumanindex(sex, timeLapse).then(setHumanindex);
  const refreshProjectsData = (sex=null) => fetchProjects(sex).then(setProjects);
  const refreshParticipacionesProjects = (sex=null) => fetchParticipacionesProjects(sex).then(setParticipacionesProjects);
  const refreshPatents = () => fetchPatents().then(setPatents);
  const refreshPatentsSection = () => fetchPatentsSection().then(setPatentsSections);

  useEffect(() => {
    refrestDocumentsData();
    refreshArticlesData();
    refreshIsbnData();
    refrestHumanIndex();
    refreshProjectsData();
    refreshParticipacionesProjects();
    refreshPatents();
    refreshPatentsSection();
  }, []);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setModeIcon(sunSVG);
      document.getElementById("root").style["background-color"] = '#242424';
      document.getElementById("root").style["color"] = '#D9FAFF';
    } else {
      setMode('light');
      setModeIcon(moonSVG);
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

  const handleDataSelection = (sex, timeLapse, chartName) => {
    const sexParam = (sex == "M" || sex == "F") ? sex : null;
    switch (chartName) {
      case 'Documentos':
        refrestDocumentsData(sexParam, timeLapse);
        break;
      case "Artículos":
        refreshArticlesData(sexParam, timeLapse);
        break;
      case "ISBN":
        refreshIsbnData(sexParam, timeLapse);
        break;
      case "Humanindex":
        refrestHumanIndex(sexParam, timeLapse);
        break;
      case "Proyectos":
        refreshProjectsData(sexParam);
        break;
      case "Parcitipaciones Proyectos":
        refreshParticipacionesProjects(sexParam);
        break;
      default:
        console.log("Invalid Chart Name");
    }
  }

  const handleActiveDotClick = ({title, timeLapse, time, dataKey, sex, total}) => {
    setIsModalOpen(true);
    setModalData({title, timeLapse, time, dataKey, sex, total});
  };

  const colors = ["#be123c", '#9333ea', "#0891b2", "#65a30d", "#ca8a04", "#ea580c"]

  return (
    <div id="parent" className={mode}>
      {isModalOpen && <Modal data={modalData} onCloseModal={() => setIsModalOpen(false)} />}
      <header className='w-full h-12 mt-2 lg:h-24 flex flex-row bg-transparent align-middle items-center justify-between absolute z-50'>
        <a href="https://web.siia.unam.mx/siia-publico/index.php" target="_blank">
          <img src={siiaLogo} className="logo basis-3/4 lg:basis-1/4" alt="SIIA logo" />
        </a>
        <h2 className='collapse lg:visible text-center text-2xl basis-auto font-nunita text-neutral-500 dark:text-dark-secondary'>Sistema Integral de Información Académica</h2>
        <div className='basis-1/6 flex flex-row'>
          <a href="https://github.com/geromt/informe-prueba" target="_blank" className='h-24 w-24'>
            <img src={githubLogo} className='w-full h-full p-6 hover:scale-105' alt="Github logo" />
          </a>
          <button className='h-24 w-24 bg-transparent hover:border-0' onClick={toggleMode}>
            <img src={modeIcon} className='w-full h-full hover:scale-105' alt="Mode switcher" />
          </button>
        </div>
      </header>
      <main>
        <div id="main-screen" className="relative h-screen flex flex-col lg:flex-col items-center justify-center lg:justify-center gap-4 lg:gap-0">
          <img ref={parallax.ref} src={facMedicina} className="absolute w-full h-full object-cover" alt="Facultad de Medicina" />
          
          <h1 className=' font-nunito text-neutral-600 underline dark:text-neutral-400 font-bold text-7xl'>Facultad de Medicina</h1>
          <p className='lg:basis-1/3 text-2xl font-nunito text-neutral-500'>Informe ejecutivo</p>
          {/* <div className='flex flex-col basis-80 h-2/3 justify-center z-10 right-0 flex-initial'>
            <MainButton text="Producción Académica" />
            <MainButton text="Docencia" />
            <MainButton text="Estímulos, programas, premios y reconocimientos" />
            <MainButton text="Personal Académico" />
          </div> */}
          {
            mode == "light" ? (
              <Button.Group outline className='rounded-full bg-transparent shadow-md shadow-blue-300 font-nunito'>
                <Button color="light" >Producción Académica</Button>
                <Button color="light" >Docencia</Button>
                <Button color="light" >Premios y reconocimientos</Button>
                <Button color="light" >Personal Académico</Button>
              </Button.Group>
            ) : (
              <Button.Group outline className='rounded-full text-neutral-400 bg-transparent shadow-md shadow-blue-300 dark:shadow-neutral-700 font-nunito'>
                <Button color="gray" pill>Producción Académica</Button>
                <Button color="gray" >Docencia</Button>
                <Button color="gray" >Premios y reconocimientos</Button>
                <Button color="gray" pill >Personal Académico</Button>
              </Button.Group>
            )
          }
          
        </div>
        
        <div className='h-48 lg:h-96 bg-white dark:bg-dark-background'></div>
        <div onScroll={handleScroll} id="snap-scroll" className='w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll sticky remove-scroll'>
          {documents && <LinearChart title="Documentos" data={documents} colors={colors} mode={mode} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick} />}
          {articles && <LinearChart title="Artículos" data={articles} colors={colors} mode={mode} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick}/>}
          {isbn && <LinearChart title="ISBN" data={isbn} colors={colors} mode={mode} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick}/>}
          {humanindex && <LinearChart title="Humanindex" data={humanindex} colors={colors} mode={mode} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick}/>}
          {projects && <BarLineChart title="Proyectos" data={projects} colors={colors} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick}/>}
          {participacionesProjects && <BarLineChart title="Participaciones Proyectos" data={participacionesProjects} colors={colors} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick}/>}
          {patentsSections && <PatentsSwitchChart title="Patente por secciones" data={patentsSections} colors={colors} onDataSelected={handleDataSelection} onActiveDotClicked={handleActiveDotClick}/>}
          {patents && <PatentsTable title="Patentes" data={patents} />}
        </div>
      </main>
    </div>
  )
}

export default App
