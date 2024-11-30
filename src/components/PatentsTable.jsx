import { Table } from "flowbite-react";
import { PropTypes } from "prop-types";

export function PatentsTable({title, data}){
    PatentsTable.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }
    return (
        <div>
            <h2>{title}</h2>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Titulo</Table.HeadCell>
                    <Table.HeadCell>Inventores</Table.HeadCell>
                    <Table.HeadCell>Año</Table.HeadCell>
                    <Table.HeadCell>Seccion</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {
                        data.data.map(({Id, Titulo, Inventores, Fecha, Seccion}) => {
                            return(
                                <Table.Row key={Id}>
                                    <Table.Cell>{Titulo}</Table.Cell>
                                    <Table.Cell>{Inventores.join("\n")}</Table.Cell>
                                    <Table.Cell>{Fecha}</Table.Cell>
                                    <Table.Cell>{Seccion.join("\n")}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </div>
    )
}