/* eslint-disable react/prop-types */
import { Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts"
import { useEffect, useState, useRef } from "react";
import { Button, Dropdown } from "flowbite-react"
import { PropTypes } from "prop-types"
import { chartToSVG, dataToTxt } from "../services/chartsServices";


export function PatentsSwitchChart({title, data, colors, onDataSelected, onActiveDotClicked}){
    PatentsSwitchChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        colors: PropTypes.array.isRequired,
        onDataSelected: PropTypes.func.isRequired,
        onActiveDotClicked: PropTypes.func.isRequired
    }
    const [dataToChart, setDataToChart] = useState(data)
    const lineChartContainer = useRef(null)
    const [chartType, setChartType] = useState("Radar")

    useEffect(() => {
        console.log(colors)
        console.log(onDataSelected)
        console.log(onActiveDotClicked)
        setDataToChart(data)
    }, [data])

    return (
        <div className="bg-white-background dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-screen snap-center shrink-0">
            <h1 className="text-white-secondary db-white-background 
          dark:text-dark-secondary dark:bg-dark-background my-4 lg:my-8">{title}</h1>
            <div className="flex flex-row justify-around w-full my-4 gap-2 lg:gap-0">
                <Dropdown outline gradientDuoTone="purpleToBlue" className="bg-transparent border-0" label="Tipo">
                    <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {setChartType("Radar")}}>
                        Radar
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {setChartType("Bar")}}>
                        Barras
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div ref={lineChartContainer} className="w-full h-2/3">
            <ResponsiveContainer width="100%">
            {chartType == "Radar" && 
                <RadarChart outerRadius={90} width={730} height={250} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="section" />
                    <Radar name="Secciones" dataKey="val" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            }
            </ResponsiveContainer>
            </div>
            <div className="flex flex-row justify-center gap-1 lg:gap-12 items-center w-full">
              <div className="flex flex-col gap-1 items-center grow-0">
                <Button outline gradientDuoTone="pinkToOrange" onClick={() => chartToSVG(lineChartContainer.current)}>Guardar como SVG</Button>
                <Button outline gradientDuoTone="pinkToOrange" onClick={() => dataToTxt(dataToChart)}>Guardar como JSON</Button>
              </div>
            </div>
        </div>
    )
}