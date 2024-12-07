/* eslint-disable react/prop-types */
import { ComposedChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import { range } from "../services/fetchServices"
import { useEffect, useState, useRef } from "react";
import { Button, Dropdown } from "flowbite-react"
import { PropTypes } from "prop-types"
import { chartToSVG, dataToTxt } from "../services/chartsServices";


const CustomizedDot = ({cx, cy, fill, dataKey, payload, title, timeLapse, sex, onDotClicked}) => {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20}>
        <circle cx="10" cy="10" r="4" fill={fill} onClick={() => onDotClicked({title: title, timeLapse:timeLapse, time:payload.name, dataKey:dataKey, sex:sex, total:payload[dataKey]})} />
      </svg>
    );
  };

  const getPath = (x, y, width, height) => (
    `M${x},${y + height}
     L${x},${y}
     L${x + width},${y}
     L${x + width},${y + height}
     Z`
  );

const CustomizedBar = ({x, y, width, height, fill, dataKey, payload, title, timeLapse, sex, onDotClicked}) => {
    return (
        <path d={getPath(x, y, width, height)} stroke="none" fill={fill} onClick={() => onDotClicked({title: title, timeLapse:timeLapse, time:payload.name, dataKey:dataKey, sex:sex, total:payload[dataKey]})} />
    );
};


export function BarLineChart({title, data, colors, onDataSelected, onActiveDotClicked}){
    BarLineChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        colors: PropTypes.array.isRequired,
        onDataSelected: PropTypes.func.isRequired,
        onActiveDotClicked: PropTypes.func.isRequired
    }
    const [dataToChart, setDataToChart] = useState(data.data)
    const [showKeys, setShowKeys] = useState({})
    const [dropdownFrom, setDropdownFrom] = useState(data.to);
    const [dropdownTo, setDropdownTo] = useState(data.from);
    const [desdeLabel, setDesdeLabel] = useState(`Desde: ${data.from}`)
    const [hastaLabel, setHastaLabel] = useState(`Hasta: ${data.to}`)
    const [sexoLabel, setSexoLabel] = useState(`Sexo: Ambos`)
    const [sexo, setSexo] = useState("Ambos")
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
        data.bar_keys.forEach(key => {
            initShowKeys[key] = true
        })
        setShowKeys(initShowKeys)
        setDataToChart(data.data)
        setDropdownFrom(data.to)
        setDropdownTo(data.from)
        setDesdeLabel(`Desde: ${data.from}`)
        setHastaLabel(`Hasta: ${data.to}`)
    }, [data])

    return (
        <div className="bg-white-background dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-screen snap-center shrink-0">
            <h1 className="text-white-secondary db-white-background 
          dark:text-dark-secondary dark:bg-dark-background my-4 lg:my-8">{title}</h1>
            <div className="flex flex-row justify-around w-full my-4 gap-2 lg:gap-0">
            <div className="flex flex-row gap-4 basis-1/2">
                <Dropdown outline gradientDuoTone="purpleToBlue" className="bg-transparent border-0" label={desdeLabel}>
                    {
                        range(dropdownFrom-data.from + 1, data.from).map((i) => {
                           return (
                           <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
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
                <Dropdown outline gradientDuoTone="purpleToBlue" className="bg-transparent border-0" label={hastaLabel}>
                {
                    range(data.to-dropdownTo + 1, dropdownTo).map((i) => {
                    return (
                        <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
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
                <Dropdown outline gradientDuoTone="purpleToBlue" className="bg-transparent border-0" label={sexoLabel}>
                    <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {
                        setSexoLabel(`Sexo: Ambos`);
                        setSexo("Ambos");
                        onDataSelected("Ambos", "year", title)
                    }}>
                    Ambos
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105"
                    onClick={() => {
                        setSexoLabel(`Sexo: Masculino`);
                        setSexo("M")
                        onDataSelected("M", "year", title)
                        }}>
                        Masculino
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {
                        setSexoLabel(`Sexo: Femenino`);
                        setSexo("F");
                        onDataSelected("F", "year", title);
                    }}>
                    Femenino
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div ref={lineChartContainer} className="w-full h-2/3">
            <ResponsiveContainer width="100%">
            <ComposedChart height={400} data={dataToChart}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {
                    data.keys.map(key => {
                        return <Line type="monotone" dataKey={key} stroke="#8884d8" strokeWidth={3} key={key}  hide={!showKeys[key]}
                        activeDot={<CustomizedDot title={title} timeLapse={"year"} sex={sexo} onDotClicked={onActiveDotClicked}/>}/>
                    })
                }
                {
                    data.bar_keys.map((key, index) => {
                        return <Bar dataKey={key} fill={colors[index]} key={key} hide={!showKeys[key]}
                        shape={<CustomizedBar title={title} timeLapse={"year"} sex={sexo} onDotClicked={onActiveDotClicked}/>}/>})
                }
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend onClick={(e) => handleShowKeys(e.dataKey)} />
            </ComposedChart>
            </ResponsiveContainer>
            </div>
            <div className="flex flex-row justify-center gap-1 lg:gap-12 items-center w-full">
              <div className="grid grid-cols-3 gap-x-1 lg:flex lg:flex-row justify-center lg:gap-8 grow">
              {
                  data.keys.map(key => {
                      return <Button gradientDuoTone="purpleToBlue" className="items-center h-14 lg:h-auto" key={key} onClick={() => handleShowKeys(key)}>
                          {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                      </Button>
                  })
              }
              {
                  data.bar_keys.map(key => {
                      return <Button gradientDuoTone="purpleToBlue" className="items-center h-14 lg:h-auto" key={key} onClick={() => handleShowKeys(key)}>
                          {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                      </Button>
                  })
              }
              </div>
              <div className="flex flex-col gap-1 items-center grow-0">
                <Button outline gradientDuoTone="pinkToOrange" onClick={() => chartToSVG(lineChartContainer.current)}>Guardar como SVG</Button>
                <Button outline gradientDuoTone="pinkToOrange" onClick={() => dataToTxt(dataToChart)}>Guardar como JSON</Button>
              </div>
            </div>
        </div>
    )
}