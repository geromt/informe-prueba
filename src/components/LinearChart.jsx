import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { range } from "../services/fetchServices"
import { useEffect, useState } from "react";
import { Button, Dropdown } from "flowbite-react"
import { PropTypes } from "prop-types"


function CustomTooltip({ payload, label, active, data }) {
  CustomTooltip.propTypes = {
    payload: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string,
    active: PropTypes.bool,
    data: PropTypes.object,
  }
  const colors = ['text-[#AF2BBF]', "text-[#51CB20]", "text-[#E4572E]", "text-[#773344]", "text-[#DA3E52]"]

  if (active) {
    return (
      <div className="bg-white-background/30 rounded-sm flex flex-col items-center">
        <p className="text-white-text font-bold text-2xl">{label}</p>
        {
          data.keys.map((key, index) => {
            return <p key={key} className={colors[index]}>{`${key}: ${payload[index].value}`}</p>
          })
        }
      </div>
    );
  }

  return null;
}


export function LinearChart({title, data, colors}){
    LinearChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        colors: PropTypes.array.isRequired
    }
    const [showKeys, setShowKeys] = useState({})
    const [dropdownFrom, setDropdownFrom] = useState(data.to);
    const [dropdownTo, setDropdownTo] = useState(data.from);
    const [desdeLabel, setDesdeLabel] = useState(`Desde: ${data.from}`)
    const [hastaLabel, setHastaLabel] = useState(`Hasta: ${data.to}`)
    const [sexoLabel, setSexoLabel] = useState(`Sexo: Ambos`)

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
        setShowKeys(initShowKeys)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
      

    return (
        <div className="bg-white-background w-full dark:bg-dark-background flex flex-col items-center justify-center h-screen snap-center shrink-0">
            <h1 className="text-white-text dark:bg-dark-secondary my-8">{title}</h1>
            <div className="flex flex-row justify-around w-full my-4">
                <div className="flex flex-row gap-4 basis-1/2">
                <Dropdown label={desdeLabel}>
                    {
                        range(dropdownFrom-data.from + 1, data.from).map((i) => {
                           return <Dropdown.Item className="bg-cyan-800 text-white border-cyan-500  hover:text-black" onClick={() => {
                            setDropdownTo(i);
                            setDesdeLabel(`Desde: ${i}`)}} key={i}>{i}</Dropdown.Item>;
                        })
                    }
                </Dropdown>
                <Dropdown label={hastaLabel}>
                    {
                        range(data.to-dropdownTo + 1, dropdownTo).map((i) => {
                           return <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" onClick={() => {
                            setDropdownFrom(i)
                            setHastaLabel(`Hasta: ${i}`)}} key={i}>{i}</Dropdown.Item>;
                        })
                    }
                </Dropdown>
                </div>
                
                <Dropdown label={sexoLabel}>
                    <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" onClick={() => {setSexoLabel(`Sexo: Ambos`)}}>Ambos</Dropdown.Item>
                    <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" onClick={() => {setSexoLabel(`Sexo: Masculino`)}}>Masculino</Dropdown.Item>
                    <Dropdown.Item className="bg-cyan-800 text-white border-cyan500 hover:text-black" onClick={() => {setSexoLabel(`Sexo: Femenino`)}}>Femenino</Dropdown.Item>
                </Dropdown>
            </div>
            <ResponsiveContainer aspect={2.25} width={1200}>
              <AreaChart height={400} data={data.data}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                          return <Area type="monotone" dataKey={key} stroke={colors[index]} key={key} fillOpacity={1} fill={`url(#color:${index})`} hide={!showKeys[key]}/>
                      })
                  }
                  <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip data={data}/>}/>
                  <Legend />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex flex-row justify-around w-1/2">
                {
                    data.keys.map(key => {
                        return <Button key={key} onClick={() => handleShowKeys(key)}>
                            {showKeys[key] ? `Ocultar ${key.toUpperCase()}`: `Mostrar ${key.toUpperCase()}`}
                        </Button>
                    })
                }
            </div>
        </div>
    )
}