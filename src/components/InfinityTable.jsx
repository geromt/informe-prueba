import { FloatingLabel, Table, Button } from "flowbite-react";
import { PropTypes } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { fetchDeserializeData } from "../services/fetchServices";
import InfiniteScroll from "react-infinite-scroll-component";

export function InfinityTable({title, datakey}){
    InfinityTable.propTypes = {
        title: PropTypes.string.isRequired,
        datakey: PropTypes.string.isRequired
    }
    const [items, setItems] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const tituloInput = useRef(null);
    const inventoresInput = useRef(null);

    // const filterData = () => {
    //   const titulo = tituloInput.current.value
    //   const inventores = inventoresInput.current.value

    //   if (titulo === '' && inventores === '') {
    //     setDataToTable(data.data)
    //     return
    //   }
    //   const filteredData = data.data.filter(item => item.Titulo.toUpperCase().includes(titulo.toUpperCase()) && item.Inventores.join(" ").toUpperCase().includes(inventores.toUpperCase()))
    //   setDataToTable(filteredData)
    // }

    const refreshData = () => {
      setIsLoading(true);
      setError(null);
      fetchDeserializeData(datakey, pageNumber).then(data => {
        setItems(prevItems => [...prevItems, ...data.data]);
        setPageNumber(prevPage => prevPage + 1);
        console.log(items)
      }).then(setIsLoading(false))
      .catch(error => setError(error))}

    useEffect(() => {
      //filterData()
      refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="bg-white-background dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-full snap-center shrink-0">
          <h1 className="text-white-secondary db-white-background 
        dark:text-dark-secondary dark:bg-dark-background text-lg my-4 lg:my-4">{title}</h1>
          <div className="grid grid-cols-3 gap-4 w-11/12 lg:w-3/4">
            <FloatingLabel ref={tituloInput} label="Título" variant="filled"/>
            <FloatingLabel ref={inventoresInput} label="Inventores" variant="filled"/>
            <Button className="items-center mb-2 mx-2 " onClick={() => console.log("Buscando")}>Buscar</Button>
          </div>
            <div id="scrollableTarget" className="w-full overflow-x-hidden">
              <InfiniteScroll scrollableTarget="scrollableTarget" dataLength={items.length} next={refreshData} hasMore={true} loader={<p>Loading...</p>} endMessage={<p>No more data to load</p>}>
                <Table striped hoverable>
                  <Table.Head>
                    <Table.HeadCell>i</Table.HeadCell>
                    <Table.HeadCell>Obra Título</Table.HeadCell>
                    <Table.HeadCell>ObraEditorial</Table.HeadCell>
                    <Table.HeadCell>Titulo</Table.HeadCell>
                    <Table.HeadCell>Fecha</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                  {
                    items.map(({obraTitulo, obraEditorial, titulo, fechaPublicacion}, index) => {
                      return(
                        <Table.Row className="border-y-white-primary border-2" key={index}>
                          <Table.Cell className="text-white-secondary">{index + 1}</Table.Cell>
                          <Table.Cell className="text-white-text dark:text-dark-secondary">{obraTitulo}</Table.Cell>
                          <Table.Cell className="text-white-text dark:text-dark-secondary">{obraEditorial}</Table.Cell>
                          <Table.Cell className="text-white-text dark:text-dark-secondary">{titulo}</Table.Cell>
                          <Table.Cell className="text-white-text dark:text-dark-secondary">{fechaPublicacion}</Table.Cell>
                        </Table.Row>
                      )
                    })
                  }
                  </Table.Body>
                </Table>
              </InfiniteScroll>
            {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    )
}