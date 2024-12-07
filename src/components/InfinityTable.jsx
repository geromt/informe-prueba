import { FloatingLabel, Table, Button, TableHead } from "flowbite-react";
import { PropTypes } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { fetchDeserializeData } from "../services/fetchServices";
import InfiniteScroll from "react-infinite-scroll-component";

export function InfinityTable({title, timeLapse, time, dataKey, sex, total}){
    InfinityTable.propTypes = {
        title: PropTypes.string.isRequired,
        timeLapse: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        sex: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired
    }
    const [items, setItems] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [titleSearch, setTitleSearch] = useState(null);
    const tituloInput = useRef(null);

    const filterData = () => {
      const titulo = tituloInput.current.value
      console.log(titulo)
      
      fetchDeserializeData(title, timeLapse, time, dataKey, 0, sex, titulo)
      .then(data => {
        setItems(data.data);
        setTitleSearch(titulo);
        setPageNumber(1);
      })
    }

    const refreshData = () => {
      setIsLoading(true);
      setError(null);
      fetchDeserializeData(title, timeLapse, time, dataKey, pageNumber, sex, titleSearch).then(data => {
        setItems([...items, ...data.data]);
        setPageNumber(pageNumber + 1);
      }).then(setIsLoading(false))
      .catch(error => setError(error))}

    useEffect(() => {
      //filterData()
      refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderHead = () => {
      if (title == "Artículos"){
        return (
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell>Revista Título</Table.HeadCell>
            <Table.HeadCell>Revista Editorial</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
          </Table.Head>
        )
      } else if (title == "Proyectos" || title == "Participaciones Proyectos") {
        return (
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Situación</Table.HeadCell>
            <Table.HeadCell>Área</Table.HeadCell>
            <Table.HeadCell>Fecha Situación</Table.HeadCell>
          </Table.Head>
        )
      } else {
        return (
          <TableHead>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell>Obra Título</Table.HeadCell>
            <Table.HeadCell>ObraEditorial</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
          </TableHead>
        )
      } 
    }

    const renderRows = () => {
      if (title == "Artículos"){
        return items.map(({revistaTitulo, revistaEditorial, titulo, fechaPublicacion, accesoElectronico}, index) => {
          return(
            <Table.Row className="border-y-white-primary border-2" key={index}>
              <Table.Cell className="text-white-secondary">{index + 1}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary"><a href={accesoElectronico}>{titulo}</a></Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{revistaTitulo}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{revistaEditorial}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{fechaPublicacion}</Table.Cell>
            </Table.Row>
          )
        })
      } else if (title == "Proyectos" || title == "Participaciones Proyectos") {
        return items.map(({nombre, situacion, area, fechaSituacion}, index) => {
          return(
            <Table.Row className="border-y-white-primary border-2" key={index}>
              <Table.Cell className="text-white-secondary">{index + 1}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{nombre}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{situacion}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{area}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{fechaSituacion}</Table.Cell>
            </Table.Row>
          )
        })
      } else {
        return items.map(({obraTitulo, obraEditorial, titulo, fechaPublicacion, accesoElectronico}, index) => {
          return(
            <Table.Row className="border-y-white-primary border-2" key={index}>
              <Table.Cell className="text-white-secondary">{index + 1}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary"><a href={accesoElectronico}>{titulo}</a></Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{obraEditorial}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{obraTitulo}</Table.Cell>
              <Table.Cell className="text-white-text dark:text-dark-secondary">{fechaPublicacion}</Table.Cell>
            </Table.Row>
          )
        })
      }
    }

    return (
        <div className="bg-white-background dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-full snap-center shrink-0">
          <h1 className="text-white-secondary db-white-background 
        dark:text-dark-secondary dark:bg-dark-background text-lg my-4 lg:my-4">{`${title} con ${dataKey} del ${time}`}</h1>
          <div className="grid grid-cols-3 gap-4 w-11/12 lg:w-3/4">
            <FloatingLabel ref={tituloInput} label="Título" variant="filled"/>
            <Button className="items-center mb-2 mx-2 " onClick={filterData}>Buscar</Button>
          </div>
            <div id="scrollableTarget" className="w-full overflow-x-hidden">
              <InfiniteScroll scrollableTarget="scrollableTarget" dataLength={items.length} 
              next={refreshData} hasMore={items.length < total} loader={<p>Loading...</p>} endMessage={<p>No more data to load</p>}>
                <Table striped hoverable>
                  {renderHead()}
                  <Table.Body>
                  {renderRows()}
                  </Table.Body>
                </Table>
              </InfiniteScroll>
            {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    )
}