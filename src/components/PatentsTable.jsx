import { FloatingLabel, Table, Button } from "flowbite-react";
import { PropTypes } from "prop-types";
import { useEffect, useRef, useState } from "react";

export function PatentsTable({title, data}){
    PatentsTable.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }
    const [dataToTable, setDataToTable] = useState(data.data)
    const tituloInput = useRef(null);
    const inventoresInput = useRef(null);

    const filterData = () => {
      const titulo = tituloInput.current.value
      const inventores = inventoresInput.current.value

      if (titulo === '' && inventores === '') {
        setDataToTable(data.data)
        return
      }
      const filteredData = data.data.filter(item => item.Titulo.toUpperCase().includes(titulo.toUpperCase()) && item.Inventores.join(" ").toUpperCase().includes(inventores.toUpperCase()))
      setDataToTable(filteredData)
    }

    useEffect(() => {
      console.log(dataToTable)
      filterData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="bg-white dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-screen snap-center shrink-0">
          <h1 className="font-nunito font-bold text-6xl underline text-neutral-700 dark:text-neutral-500 
         dark:bg-dark-background my-2 lg:my-4">{title}</h1>
          <div className="grid grid-cols-3 gap-4 w-11/12 lg:w-3/4">
            <FloatingLabel ref={tituloInput} label="Título" variant="filled"/>
            <FloatingLabel ref={inventoresInput} label="Inventores" variant="filled"/>
            <Button pill color="gray" className="items-center mb-2 mx-2 lg:mx-24 shadow-md dark:shadow-sm shadow-blue-800 dark:shadow-neutral-400" onClick={() => filterData()}>Buscar</Button>
          </div>
            <div className="w-full overflow-x-scroll overflow-y-scroll">
            <Table striped hoverable>
                <Table.Head>
                    <Table.HeadCell>Título</Table.HeadCell>
                    <Table.HeadCell>Inventores</Table.HeadCell>
                    <Table.HeadCell>Año</Table.HeadCell>
                    <Table.HeadCell>Seccion</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {
                        dataToTable.map(({Id, Titulo, Inventores, Fecha, Seccion}) => {
                            return(
                                <Table.Row className="border-y-white-primary border-2" key={Id}>
                                    <Table.Cell className="text-white-text dark:text-dark-secondary">{Titulo}</Table.Cell>
                                    <Table.Cell className="text-white-text dark:text-dark-secondary">{Inventores.join("\n")}</Table.Cell>
                                    <Table.Cell className="text-white-text dark:text-dark-secondary">{Fecha}</Table.Cell>
                                    <Table.Cell className="text-white-text dark:text-dark-secondary">{Seccion.join("\n")}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            </div>
        </div>
    )
}