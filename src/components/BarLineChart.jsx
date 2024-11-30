import { ComposedChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import { range } from "../services/fetchServices"
import { useEffect, useState } from "react";
import { Button, Dropdown } from "flowbite-react"
import { PropTypes } from "prop-types"

export function BarLineChart({title, data}){
    BarLineChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }
    const [showKeys, setShowKeys] = useState({})

    const [dropdownFrom, setDropdownFrom] = useState(data.to);
    const [dropdownTo, setDropdownTo] = useState(data.from);

    const handleShowKeys = (key) => {
        const newKeys = {...showKeys};
        newKeys[key] = !newKeys[key];
        setShowKeys(newKeys);
    }

    useEffect(() => {
        const initShowKeys = {}
        data.keys.forEach(key => {
            initShowKeys[key] = true
        })
        data.bar_keys.forEach(key => {
            initShowKeys[key] = true
        })
        console.log(initShowKeys);
        setShowKeys(initShowKeys)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <Dropdown label="Desde">
                    {
                        range(dropdownFrom-data.from + 1, data.from).map((i) => {
                           return <Dropdown.Item onClick={() => setDropdownTo(i)} key={i}>{i}</Dropdown.Item>;
                        })
                    }
                </Dropdown>
                <Dropdown label="Hasta">
                    {
                        range(data.to-dropdownTo + 1, data.from).map((i) => {
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
            <ComposedChart width={600} height={400} data={data.data}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {
                    data.keys.map(key => {
                        return <Line type="monotone" dataKey={key} stroke="#8884d8" key={key} hide={!showKeys[key]}/>
                    })
                }
                {
                    data.bar_keys.map(key => {
                        return <Bar dataKey={key} fill="#8884d8" key={key} hide={!showKeys[key]}/>
                    })
                }
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
            </ComposedChart>
            <div>
                {
                    data.keys.map(key => {
                        return <Button key={key} onClick={() => handleShowKeys(key)}>
                            {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                        </Button>
                    })
                }
                {
                    data.bar_keys.map(key => {
                        return <Button key={key} onClick={() => handleShowKeys(key)}>
                            {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                        </Button>
                    })
                }
            </div>
        </div>
    )
}