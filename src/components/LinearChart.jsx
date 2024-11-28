import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { range, transformData } from "../services/fetchServices"
import { useState } from "react";
import { Button, Dropdown } from "flowbite-react"

export function LinearChart({title, data}){
    const [showWos, setShowWos] = useState(true);
    const [showScotus, setShowScotus] = useState(true);
    const [showWosScotus, setShowWosScotus] = useState(true);
    const [showPubMed, setShowPubMed] = useState(true);
    const [dropdownFrom, setDropdownFrom] = useState(data.to);
    const [dropdownTo, setDropdownTo] = useState(data.from);

    const transformedData = transformData(data);
    
    const handleShowWos = () => setShowWos(!showWos);
    const handleShowScotus = () => setShowScotus(!showScotus);
    const handleShowWosScotus = () => setShowWosScotus(!showWosScotus);
    const handleShowPubMed = () => setShowPubMed(!showPubMed);
    const handleDropdownFrom = (i) => setDropdownFrom(i);

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <Dropdown label="Desde">
                    {
                        range(dropdownFrom-data.from + 1, data.from).map((i) => {
                           return <Dropdown.Item key={i}>{i}</Dropdown.Item>;
                        })
                    }
                </Dropdown>
                <Dropdown label="Hasta">
                    {
                        range(data.to-data.from + 1, data.from).map((i) => {
                           return <Dropdown.Item onClick={() => setDropdownFrom(i)} key={i}>{i}</Dropdown.Item>;
                        })
                    }
                </Dropdown>
                <Dropdown label="Sexo">
                    <Dropdown.Item>Ambos</Dropdown.Item>
                    <Dropdown.Item>Masculino</Dropdown.Item>
                    <Dropdown.Item>Femenino</Dropdown.Item>
                </Dropdown>
            </div>
            <LineChart width={600} height={400} data={transformedData}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {showWos && <Line type="monotone" dataKey="wos" stroke="#8884d8" />}
                {showScotus && <Line type="monotone" dataKey="scotus" stroke="#8884d8" />}
                {showWosScotus && <Line type="monotone" dataKey="wos_scotus" stroke="#8884d8" />}
                {showPubMed && <Line type="monotone" dataKey="pubmed" stroke="#8884d8" />}
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <div>
                <Button onClick={handleShowWos}>WoS</Button>
                <Button onClick={handleShowScotus}>Scotus</Button>
                <Button onClick={handleShowWosScotus}>Wos+Scotus</Button>
                <Button onClick={handleShowPubMed}>PubMed</Button>
            </div>
        </div>
    )
}