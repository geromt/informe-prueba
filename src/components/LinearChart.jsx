import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { range } from "../services/fetchServices"
import { useEffect, useRef, useState } from "react";
import { Button, Dropdown } from "flowbite-react"
import { PropTypes } from "prop-types"
import { CustomTooltip } from "./CustomTooltip";
import { chartToSVG, dataToTxt } from "../services/chartsServices";

export function LinearChart({title, data, colors, onSexSelected }){
    LinearChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        colors: PropTypes.array.isRequired,
        onSexSelected: PropTypes.func.isRequired
    }
    const [dataToChart, setDataToChart] = useState(data.data)
    const [showKeys, setShowKeys] = useState({})
    const [dropdownFrom, setDropdownFrom] = useState(data.to);
    const [dropdownTo, setDropdownTo] = useState(data.from);
    const [desdeLabel, setDesdeLabel] = useState(`Desde: ${data.from}`)
    const [hastaLabel, setHastaLabel] = useState(`Hasta: ${data.to}`)
    const [sexoLabel, setSexoLabel] = useState(`Sexo: Ambos`)
    const lineChartContainer = useRef(null)

    const handleShowKeys = (key) => {
        const newKeys = {...showKeys};
        newKeys[key] = !newKeys[key];
        setShowKeys(newKeys);
    }

    const sliceData = (completeData, from, to) => {
      const slicedData =  completeData.filter((item) => item.name >= from && item.name <= to);
      setDataToChart(slicedData)
    }

    useEffect(() => {
        const initShowKeys = {}
        data.keys.forEach(key => {
            initShowKeys[key] = true
        })
        setShowKeys(initShowKeys)
        setDataToChart(data.data)
        setDropdownFrom(data.to)
        setDropdownTo(data.from)
        setDesdeLabel(`Desde: ${data.from}`)
        setHastaLabel(`Hasat: ${data.to}`)
    }, [data])

    return (
        <div className="bg-white-background dark:bg-dark-background  flex flex-col items-center justify-center 
          w-full h-screen snap-center shrink-0">
          <h1 className="text-white-secondary db-white-background 
          dark:text-dark-secondary dark:bg-dark-background my-8">{title}</h1>
          <div className="flex flex-row justify-around w-full my-4">
            <div className="flex flex-row gap-4 basis-1/2">
              <Dropdown label={desdeLabel}>
              {
                range(dropdownFrom-data.from + 1, data.from).map((i) => {
                  return (
                  <Dropdown.Item className="bg-cyan-800 text-white border-cyan-500  hover:text-black" 
                    onClick={() => {
                      setDropdownTo(i);
                      setDesdeLabel(`Desde: ${i}`);
                      sliceData(data.data, i, dropdownFrom);
                    }} 
                    key={i}>{i}
                  </Dropdown.Item>);
                })
              }
              </Dropdown>
              <Dropdown label={hastaLabel}>
              {
                range(data.to-dropdownTo + 1, dropdownTo).map((i) => {
                  return (
                    <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" 
                      onClick={() => {
                        setDropdownFrom(i);
                        setHastaLabel(`Hasta: ${i}`);
                        sliceData(data.data, dropdownTo, i);
                      }} 
                      key={i}>{i}
                    </Dropdown.Item>
                  )
                })
              }
              </Dropdown>
            </div>
                
            <Dropdown label={sexoLabel}>
                <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" 
                  onClick={() => {
                    setSexoLabel(`Sexo: Ambos`);
                    onSexSelected("Ambos", title)
                  }}>
                  Ambos
                </Dropdown.Item>
                <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black"
                  onClick={() => {
                    setSexoLabel(`Sexo: Masculino`);
                    onSexSelected("M", title)
                    }}>
                    Masculino
                </Dropdown.Item>
                <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" 
                  onClick={() => {
                    setSexoLabel(`Sexo: Femenino`);
                    onSexSelected("F", title);
                  }}>
                  Femenino
                </Dropdown.Item>
            </Dropdown>
          </div>
          <div ref={lineChartContainer}>
          <ResponsiveContainer aspect={2.25} width={1200}>
            <AreaChart height={400} data={dataToChart}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
              {
                data.keys.map((key, index) => {
                  return (
                    <linearGradient id={`color:${index}`} key={key} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors[index]} stopOpacity={0}/>
                    </linearGradient>
                  )
                })
              }
              </defs>
              {
                  data.keys.map((key, index) => {
                      return <Area type="monotone" dataKey={key} stroke={colors[index]} 
                      key={key} fillOpacity={1} fill={`url(#color:${index})`} hide={!showKeys[key]}/>
                  })
              }
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip data={data} showKeys={showKeys}/>}/>
              <Legend onClick={(e) => handleShowKeys(e.dataKey)}/>
            </AreaChart>
          </ResponsiveContainer>
          </div>
          <div className="flex flex-row justify-around w-1/2">
              {
                  data.keys.map(key => {
                      return <Button key={key} onClick={() => handleShowKeys(key)}>
                          {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                      </Button>
                  })
              }
              <Button onClick={() => chartToSVG(lineChartContainer.current)}>Save to SVG</Button>
              <Button onClick={() => dataToTxt(dataToChart)}>Sava to JSON</Button>
          </div>
        </div>
    )
}