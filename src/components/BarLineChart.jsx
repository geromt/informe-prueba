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


export function BarLineChart({title, data, colors, mode, onDataSelected, onActiveDotClicked}){
    BarLineChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        colors: PropTypes.array.isRequired,
        mode: PropTypes.string.isRequired,
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
        <div className="bg-white dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-screen snap-center shrink-0">
            <h1 className=" font-nunito font-bold text-6xl underline text-neutral-700 
          dark:text-neutral-500 dark:bg-dark-background my-2 lg:my-4">{title}</h1>
            <div className="flex flex-row border-y-2 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-900/30 py-2 shadow-sm shadow-slate-300 dark:shadow-neutral-400
            justify-around w-full my-4 gap-2 lg:gap-0">
            <div className="flex flex-row gap-4 basis-1/2">
              {
                mode == "dark" ? (
                  <>
                  <Dropdown pill color="gray" className="font-nunito bg-neutral-900/30 border-0" label={desdeLabel}>
                    {
                        range(dropdownFrom-data.from + 1, data.from).map((i) => {
                           return (
                           <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105" 
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
                <Dropdown pill color="gray" className="font-nunito bg-neutral-900/30 border-0" label={hastaLabel}>
                {
                    range(data.to-dropdownTo + 1, dropdownTo).map((i) => {
                    return (
                        <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105" 
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
                </>
                ) : (
                  <>
                  <Dropdown pill outline color="light" className="font-nunito bg-transparent border-0" label={desdeLabel}>
                    {
                        range(dropdownFrom-data.from + 1, data.from).map((i) => {
                           return (
                           <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
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
                <Dropdown pill outline color="light" className="font-nunite bg-transparent border-0" label={hastaLabel}>
                {
                    range(data.to-dropdownTo + 1, dropdownTo).map((i) => {
                    return (
                        <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
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
                </>
                )
              }
                </div>
                {mode == "dark" ? (
                  <Dropdown pill color="gray" className="font-nunito bg-neutral-900/30 border-0" label={sexoLabel}>
                    <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105" 
                    onClick={() => {
                        setSexoLabel(`Sexo: Ambos`);
                        setSexo("Ambos");
                        onDataSelected("Ambos", "year", title)
                    }}>
                    Ambos
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105"
                    onClick={() => {
                        setSexoLabel(`Sexo: Masculino`);
                        setSexo("M")
                        onDataSelected("M", "year", title)
                        }}>
                        Masculino
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105" 
                    onClick={() => {
                        setSexoLabel(`Sexo: Femenino`);
                        setSexo("F");
                        onDataSelected("F", "year", title);
                    }}>
                    Femenino
                    </Dropdown.Item>
                </Dropdown>
                ) : (
                  <Dropdown pill outline color="light" className="font-nunito bg-transparent border-0" label={sexoLabel}>
                    <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {
                        setSexoLabel(`Sexo: Ambos`);
                        setSexo("Ambos");
                        onDataSelected("Ambos", "year", title)
                    }}>
                    Ambos
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105"
                    onClick={() => {
                        setSexoLabel(`Sexo: Masculino`);
                        setSexo("M")
                        onDataSelected("M", "year", title)
                        }}>
                        Masculino
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {
                        setSexoLabel(`Sexo: Femenino`);
                        setSexo("F");
                        onDataSelected("F", "year", title);
                    }}>
                    Femenino
                    </Dropdown.Item>
                </Dropdown>
                )}
                
            </div>
            <div ref={lineChartContainer} className="w-10/12 h-2/3">
            <ResponsiveContainer width="100%">
            <ComposedChart height={400} data={dataToChart}  margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
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
            <div className="flex flex-row justify-center gap-1 lg:gap-12 items-center w-full border-y-2 bg-slate-100 dark:bg-neutral-900/30 dark:border-neutral-700 py-2 shadow-sm shadow-slate-300">
              <div className="grid grid-cols-2 gap-x-1 lg:flex lg:flex-row justify-center grow">
              <Button.Group outline>
              {
                  data.keys.map(key => {
                    if (mode == "light")
                      return (<Button pill outline color="light" size="xs" className="transition shadow-md shadow-blue-300 font-nunito text-blue-950 hover:scale-105 items-center h-14 lg:h-auto" key={key} onClick={() => handleShowKeys(key)}>
                          {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                      </Button>)
                    else
                      return (<Button pill color="gray" size="xs" className="transition shadow-sm shadow-neutral-400 font-nunito text-neutral-500 hover:scale-105 items-center h-14 lg:h-auto" key={key} onClick={() => handleShowKeys(key)}>
                        {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                      </Button>)
                  })
              }
              {
                  data.bar_keys.map(key => {
                    if (mode == "light")
                      return (<Button pill outline color="light" size="xs" className="transition shadow-md shadow-blue-300 font-nunito text-blue-950 hover:scale-105 items-center h-14 lg:h-auto" key={key} onClick={() => handleShowKeys(key)}>
                          {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                      </Button>)
                    else
                    return (<Button pill color="gray" size="xs" className="transition shadow-sm shadow-neutral-400 font-nunito text-neutral-500 hover:scale-105 items-center h-14 lg:h-auto" key={key} onClick={() => handleShowKeys(key)}>
                        {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                    </Button>)
                    
                  })
              }
              </Button.Group>
              </div>
              <div className="flex flex-col gap-1 items-center grow-0">
              {
                mode == "light" ? (
                  <Button.Group outline>
                  <Button pill outline color="light" size="xs" className="transition shadow-md shadow-red-300 font-nunito text-blue-950" onClick={() => chartToSVG(lineChartContainer.current)}>Guardar como SVG</Button>
                  <Button pill outline color="light" size="xs" className="transition shadow-md shadow-red-300 font-nunito text-blue-950" onClick={() => dataToTxt(dataToChart)}>Guardar como JSON</Button>
                  </Button.Group>
                ) : (
                  <Button.Group outline>
                  <Button pill color="gray" size="xs" className="transition shadow-sm shadow-red-300 font-nunito text-blue-950" onClick={() => chartToSVG(lineChartContainer.current)}>Guardar como SVG</Button>
                  <Button pill color="gray" size="xs" className="transition shadow-sm shadow-red-300 font-nunito text-blue-950" onClick={() => dataToTxt(dataToChart)}>Guardar como JSON</Button>
                  </Button.Group>
                )
              }
              </div>
            </div>
        </div>
    )
}