/* eslint-disable react/prop-types */
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"
import { useEffect, useState, useRef } from "react";
import { Button, Dropdown } from "flowbite-react"
import { PropTypes } from "prop-types"
import { chartToSVG, dataToTxt } from "../services/chartsServices";
import { CustomTooltipPatents } from "./CustomTooltip";


const CustomizedDot = ({cx, cy, fill, dataKey, payload, title, onDotClicked}) => {
  console.log(payload)
  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20}>
      <circle cx="10" cy="10" r="4" fill={fill} onClick={() => onDotClicked({title: title, timeLapse:"year", time:"0", section:payload.name, dataKey:payload.section, sex:"Ambos", total:payload[dataKey]})} />
    </svg>
  );
};

const getPath = (x, y, width, height) => (
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
   C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
   Z`
);

const CustomizedBar = ({x, y, width, height, fill, dataKey, payload, title, onDotClicked}) => {
  return (
      <path d={getPath(x, y, width, height)} stroke="none" fill={fill} onClick={() => onDotClicked({title: title, timeLapse:"year", time:"0", dataKey:payload.section, sex:"Ambos", total:payload[dataKey]})} />
  );
};

export function PatentsSwitchChart({title, data, colors, mode, onDataSelected, onActiveDotClicked}){
    PatentsSwitchChart.propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        colors: PropTypes.array.isRequired,
        mode: PropTypes.string.isRequired,
        onDataSelected: PropTypes.func.isRequired,
        onActiveDotClicked: PropTypes.func.isRequired
    }
    const [dataToChart, setDataToChart] = useState(data)
    const lineChartContainer = useRef(null)
    const [chartType, setChartType] = useState("Radar")
    const [chartTypeLabel, setChartTypeLabel] = useState("Tipo: Radar")

    useEffect(() => {
        console.log(colors)
        console.log(onDataSelected)
        console.log(onActiveDotClicked)
        setDataToChart(data)
    }, [data])

    const renderCustomAxisTick = ({ x, y, payload }) => {
      if (payload.value === 'Física') {
        return (
        <svg fill={mode=="light"?"#000000":"#aaaaaa"} x={chartType=="Radar" ? x-25:x-16} y={chartType=="Radar" ? y-25:y-4} height={32} width={32} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g>
            <g>
              <path d="M408.772,256c11.582-10.037,22.114-20.062,31.393-29.927c48.223-51.27,47.031-81.631,37.538-98.073
                c-9.494-16.443-35.195-32.656-103.702-16.527c-13.182,3.103-27.131,7.212-41.614,12.223c-2.902-15.049-6.317-29.183-10.221-42.151
                C301.877,14.148,274.985,0,256.001,0s-45.875,14.148-66.164,81.546c-3.904,12.968-7.32,27.103-10.221,42.151
                c-14.483-5.011-28.432-9.121-41.615-12.223C69.49,95.346,43.791,111.56,34.297,128.001c-9.493,16.441-10.685,46.803,37.538,98.073
                c9.279,9.865,19.811,19.89,31.393,29.927c-11.582,10.037-22.114,20.062-31.393,29.927c-48.224,51.27-47.031,81.632-37.538,98.073
                c6.726,11.648,21.58,23.182,54.038,23.182c13.355,0,29.693-1.954,49.664-6.655c13.182-3.103,27.131-7.212,41.615-12.223
                c2.902,15.049,6.317,29.183,10.221,42.151c20.29,67.396,47.18,81.544,66.165,81.544s45.875-14.148,66.164-81.546
                c3.904-12.968,7.32-27.103,10.221-42.151c14.483,5.011,28.432,9.12,41.614,12.223c19.975,4.703,36.308,6.656,49.664,6.655
                c32.452,0,47.313-11.535,54.038-23.182c9.493-16.441,10.686-46.803-37.538-98.073C430.886,276.062,420.354,266.037,408.772,256z
                M130.819,370.014c-47.631,11.213-66.206,3.798-69.373-1.688c-3.167-5.486-0.3-25.28,33.225-60.923
                c9.661-10.271,20.815-20.754,33.2-31.257c13.01,10.068,26.957,20.046,41.644,29.787c1.093,17.589,2.761,34.657,4.974,50.958
                C159.199,362.364,144.545,366.783,130.819,370.014z M168.058,266.935c-5.107-3.628-10.099-7.275-14.953-10.935
                c4.855-3.66,9.846-7.308,14.953-10.935c-0.048,3.633-0.076,7.277-0.076,10.935C167.982,259.658,168.01,263.303,168.058,266.935z
                M169.515,206.065c-14.687,9.741-28.634,19.719-41.644,29.787c-12.385-10.502-23.539-20.985-33.201-31.256
                c-33.525-35.643-36.393-55.436-33.225-60.923c1.96-3.395,9.82-7.53,26.819-7.53c10.468,0,24.401,1.568,42.553,5.841
                c13.726,3.231,28.381,7.65,43.67,13.123C172.275,171.408,170.607,188.477,169.515,206.065z M309.443,185.306
                c-3.122-1.858-6.264-3.704-9.432-5.534c-3.168-1.828-6.338-3.626-9.509-5.401c5.696-2.609,11.35-5.109,16.947-7.482
                C308.192,172.923,308.855,179.069,309.443,185.306z M219.853,90.582c14.105-46.855,29.812-59.235,36.147-59.235
                c6.335,0,22.043,12.38,36.148,59.235c4.065,13.502,7.566,28.403,10.47,44.38c-15.224,6.233-30.839,13.322-46.618,21.172
                c-15.779-7.848-31.394-14.938-46.617-21.171C212.287,118.986,215.789,104.084,219.853,90.582z M204.553,166.89
                c5.598,2.374,11.251,4.872,16.946,7.482c-3.17,1.775-6.34,3.573-9.508,5.402c-3.168,1.828-6.31,3.674-9.432,5.532
                C203.147,179.069,203.81,172.924,204.553,166.89z M202.559,326.694c3.122,1.858,6.264,3.704,9.431,5.533
                c3.168,1.83,6.338,3.627,9.509,5.402c-5.696,2.609-11.349,5.107-16.946,7.483C203.81,339.077,203.148,332.931,202.559,326.694z
                M292.149,421.418c-14.105,46.855-29.812,59.235-36.148,59.235c-6.335,0-22.043-12.38-36.147-59.235
                c-4.065-13.502-7.566-28.403-10.47-44.381c15.223-6.233,30.839-13.322,46.617-21.171c15.779,7.848,31.395,14.939,46.618,21.172
                C299.715,393.014,296.214,407.916,292.149,421.418z M307.449,345.111c-5.597-2.374-11.251-4.873-16.947-7.483
                c3.17-1.775,6.339-3.573,9.508-5.402c3.168-1.829,6.311-3.675,9.433-5.533C308.856,332.931,308.192,339.077,307.449,345.111z
                M312.011,288.338c-8.981,5.688-18.218,11.282-27.675,16.742c-9.457,5.46-18.919,10.662-28.336,15.596
                c-9.417-4.935-18.879-10.137-28.337-15.596c-9.456-5.46-18.692-11.053-27.674-16.741c-0.435-10.622-0.661-21.418-0.661-32.339
                c0-10.92,0.226-21.715,0.661-32.339c8.982-5.687,18.218-11.282,27.674-16.741c9.457-5.46,18.919-10.662,28.337-15.596
                c9.417,4.935,18.879,10.137,28.336,15.596c9.457,5.46,18.693,11.054,27.675,16.742c0.435,10.622,0.661,21.418,0.661,32.338
                C312.673,266.919,312.447,277.715,312.011,288.338z M381.184,141.986c18.154-4.274,32.086-5.841,42.555-5.841
                c16.995,0,24.858,4.134,26.818,7.53c3.167,5.487,0.3,25.28-33.225,60.923c-9.661,10.271-20.815,20.754-33.2,31.257
                c-13.01-10.068-26.957-20.045-41.643-29.787c-1.093-17.589-2.761-34.657-4.975-50.959
                C352.802,149.636,367.458,145.217,381.184,141.986z M343.944,245.065c5.107,3.627,10.098,7.275,14.953,10.935
                c-4.855,3.66-9.845,7.307-14.953,10.935c0.048-3.633,0.076-7.277,0.076-10.935C344.021,252.342,343.992,248.698,343.944,245.065z
                M450.556,368.327c-3.167,5.487-21.747,12.898-69.373,1.688c-13.726-3.231-28.382-7.65-43.669-13.123
                c2.214-16.3,3.882-33.369,4.975-50.959c14.686-9.741,28.634-19.719,41.643-29.787c12.384,10.503,23.538,20.987,33.2,31.257
                C450.856,343.046,453.724,362.841,450.556,368.327z"/>
            </g>
          </g>
          <g>
            <g>
              <polygon points="274.734,244.921 255.6,233.938 236.522,245.017 236.577,267.079 255.71,278.062 274.789,266.983 		"/>
            </g>
          </g>
        </svg>
        )
      } else if (payload.value === "Química") {
        return (
          <svg x={x-16} y={chartType=="Radar" ? y-25 : y-4} width={32} height={32} viewBox="0 0 24 24" fill={mode=="light"?"#000000":"#aaaaaa"} xmlns="http://www.w3.org/2000/svg">
            <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill={mode=="light"?"#000000":"#aaaaaa"}/>
            <path d="M15 18C15 18.5523 14.5523 19 14 19C13.4477 19 13 18.5523 13 18C13 17.4477 13.4477 17 14 17C14.5523 17 15 17.4477 15 18Z" fill={mode=="light"?"#000000":"#aaaaaa"}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M15 3V7.58152C17.9318 8.76829 20 11.6426 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 11.6426 6.06817 8.76829 9 7.58152V3H8C7.44772 3 7 2.55228 7 2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2C17 2.55228 16.5523 3 16 3H15ZM9.75043 9.43539L10.3752 9.18249C10.7529 9.02962 11 8.66295 11 8.25555V3H13V8.25555C13 8.66295 13.2471 9.02962 13.6248 9.18249L14.2496 9.43539C15.1075 9.78268 15.8661 10.3221 16.4726 11L7.52739 11C8.13388 10.3221 8.89249 9.78268 9.75043 9.43539ZM6.3414 13C6.12025 13.6258 6 14.2991 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 14.2991 17.8798 13.6258 17.6586 13L6.3414 13Z" fill={mode=="light"?"#000000":"#aaaaaa"}/>
          </svg>
        )
      } else if (payload.value === "Electricidad") {
        return (
          <svg x={chartType=="Radar"? x:x-16} y={chartType=="Radar"?y-25:y-4} width={32} height={32} viewBox="0 0 20 20" fill={mode=="light"?"#000000":"#aaaaaa"} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 8H11.9451L13.9191 3.39392C14.2019 2.73405 13.7179 2 13 2H8C7.59997 2 7.23843 2.2384 7.08086 2.60608L4.08086 9.60608C3.79805 10.2659 4.28208 11 5 11H6.73423L4.07207 17.6273C3.67234 18.6223 4.90667 19.4633 5.68646 18.7272L10.7099 13.9849L15.6501 9.75985C16.3559 9.156 15.9289 8 15 8ZM9.50943 8.60608C9.22663 9.26595 9.71066 10 10.4286 10H12.2929L9.37334 12.4979L7.62514 14.1477L9.14152 10.3727C9.40546 9.71569 8.92168 9 8.21359 9H6.51654L8.6594 4H11.4835L9.50943 8.60608Z" fill={mode=="light"?"#000000":"#aaaaaa"}/>
          </svg>
        )
      } else if (payload.value === "Construcciones") {
        return (
          <svg x={chartType=="Radar"?x:x-16} y={chartType=="Radar"?y-15:y-4} width={32} height={32} viewBox="0 0 24 24" fill={mode=="light"?"#000000":"#aaaaaa"} xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.13861 8.5856C3.10395 8.79352 3.07799 8.98444 3.05852 9.15412C2.89911 9.20305 2.72733 9.2683 2.55279 9.35557C2.18416 9.53989 1.78511 9.83206 1.48045 10.2891C1.17162 
          10.7523 1 11.325 1 12C1 12.675 1.17162 13.2477 1.48045 13.7109C1.78511 14.1679 2.18416 14.4601 2.55279 14.6444C2.72733 14.7317 2.89911 14.7969 3.05852 14.8459C3.07798 15.0156 3.10395 15.2065 3.13861 15.4144C3.27452 
          16.2299 3.54822 17.3325 4.10557 18.4472C4.66489 19.5658 5.51956 20.7149 6.8203 21.5821C8.1273 22.4534 9.82502 23 12 23C14.175 23 15.8727 22.4534 17.1797 21.5821C18.4804 20.7149 19.3351 19.5658 19.8944 18.4472C20.4518 
          17.3325 20.7255 16.2299 20.8614 15.4144C20.896 15.2065 20.922 15.0156 20.9415 14.8459C21.1009 14.7969 21.2727 14.7317 21.4472 14.6444C21.8158 14.4601 22.2149 14.1679 22.5196 13.7109C22.8284 13.2477 23 12.675 23 12C23 
          11.325 22.8284 10.7523 22.5196 10.2891C22.2149 9.83206 21.8158 9.53989 21.4472 9.35557C21.2727 9.2683 21.1009 9.20305 20.9415 9.15412C20.922 8.98444 20.896 8.79352 20.8614 8.5856C20.7255 7.77011 20.4518 6.6675 19.8944 
          5.55278C19.3351 4.43416 18.4804 3.28511 17.1797 2.41795C15.8727 1.54662 14.175 1 12 1C9.82502 1 8.1273 1.54662 6.8203 2.41795C5.51957 3.28511 4.66489 4.43416 4.10558 5.55279C3.54822 6.6675 3.27452 7.77011 3.13861 
          8.5856ZM18.9025 15H5.09753C5.20639 15.692 5.43305 16.63 5.89443 17.5528C6.33511 18.4342 6.98044 19.2851 7.9297 19.9179C8.8727 20.5466 10.175 21 12 21C13.825 21 15.1273 20.5466 16.0703 19.9179C17.0196 19.2851 17.6649 
          18.4342 18.1056 17.5528C18.5669 16.63 18.7936 15.692 18.9025 15ZM18.9025 9H18C17.4477 9 17 9.44771 17 10C17 10.5523 17.4477 11 18 11H20C20.3084 11.012 20.6759 11.1291 20.8554 11.3984C20.9216 11.4977 21 11.675 21 12C21 
          12.325 20.9216 12.5023 20.8554 12.6016C20.6759 12.8709 20.3084 12.988 20 13H4C3.69155 12.988 3.32414 12.8709 3.14455 12.6016C3.07838 12.5023 3 12.325 3 12C3 11.675 3.07838 11.4977 3.14455 11.3984C3.32414 11.1291 3.69155 
          11.012 4 11H6C6.55228 11 7 10.5523 7 10C7 9.44771 6.55228 9 6 9H5.09753C5.20639 8.30804 5.43306 7.36996 5.89443 6.44721C6.33512 5.56584 6.98044 4.71489 7.92971 4.08205C8.24443 3.87224 8.59917 3.68195 9 3.52152V6C9 
          6.55228 9.44771 7 10 7C10.5523 7 11 6.55228 11 6V3.04872C11.3146 3.01691 11.6476 3 12 3C12.3524 3 12.6854 3.01691 13 3.04872V6C13 6.55228 13.4477 7 14 7C14.5523 7 15 6.55228 15 6V3.52152C15.4008 3.68195 15.7556 3.87224 
          16.0703 4.08205C17.0196 4.71489 17.6649 5.56584 18.1056 6.44721C18.5669 7.36996 18.7936 8.30804 18.9025 9Z" fill={mode=="light"?"#000000":"#aaaaaa"}/>
          </svg>
        )
      } else if (payload.value === "Necesidades Humanas") {
        return (
          <svg fill={mode=="light"?"#000000":"#aaaaaa"} x={x-16} y={y-4} width={32} height={32} xmlns="http://www.w3.org/2000/svg"
              viewBox="-69 0 117 256">
          <path d="M-10.9,4.9c11.3,0,20.5,9.2,20.5,20.5S0.4,45.9-10.9,45.9s-20.5-9.2-20.5-20.5S-22.2,4.9-10.9,4.9z M14.9,51.2h-51.2
            c-14.2,0-25.6,11.4-25.6,25.6v62.6c0,4.9,3.9,9,9,9s9-3.9,9-9V81.9c0-1.4,1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6v155.2
            c0,7.7,5.7,14,12.8,14s12.8-6.3,12.8-14v-88.5c0-1.4,1.2-2.6,2.6-2.6c1.4,0,2.6,1.2,2.6,2.6v88.5c0,7.7,5.7,14,12.8,14
            c7.1,0,12.8-6.3,12.8-14V81.9c0-1.4,1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6v57.6c0,4.9,3.9,9,9,9s9-3.9,9-9V76.8
            C40.5,62.6,28.8,51.2,14.9,51.2z"/>
          </svg>
        )
      } else if (payload.value === "Ingeniería") {
        return (
          <svg fill={mode=="light"?"#000000":"#aaaaaa"} x={x-16} y={y-4} width={32} height={32} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 503.607 503.607">
          <g transform="translate(1 1)">
            <g>
              <path d="M477.426,416.993c-50.095-26.565-88.52-41.461-122.727-47.172l3.54-4.867c1.679-1.679,2.518-4.197,1.679-6.715
                l-7.866-31.463c20.804-29.41,33.046-66.178,33.046-101.153v-33.574h8.393h16.787c5.036,0,8.393-3.357,8.393-8.393
                s-3.357-8.393-8.393-8.393h-8.393v-8.393c0-66.308-43.646-122.544-109.115-141.01V24.18c0-13.43-10.911-25.18-25.18-25.18h-33.574
                c-13.43,0-25.18,10.911-25.18,25.18v1.679c-65.469,18.466-109.115,74.702-109.115,141.01v8.393h-8.393
                c-5.036,0-8.393,3.357-8.393,8.393s3.357,8.393,8.393,8.393h16.787h8.393v33.574c0,34.975,12.242,71.743,33.046,101.154
                l-7.866,31.463c0,1.679,0,5.036,1.679,6.715l3.54,4.867c-34.206,5.712-72.632,20.607-122.727,47.172
                C8.233,424.548-1,440.495-1,458.121v36.092c0,5.036,3.357,8.393,8.393,8.393h201.443h3.357h77.22h3.357h201.443
                c5.036,0,8.393-3.357,8.393-8.393v-36.092C502.607,441.334,492.534,425.387,477.426,416.993z M245.77,409.224l5.081-11.432
                l12.545,27.6l8.205,18.46h-40.941L245.77,409.224z M224.28,460.639h52.983l4.796,25.18h-62.815L224.28,460.639z M338.934,343.131
                l3.357,15.108l-8.574,11.773c-0.547,0.447-1.053,0.989-1.498,1.656l-34.912,48.34l-11.078,15.211l-22.628-50.913
                c27.048-3.299,51.193-16.877,70.694-36.39c0.216-0.214,0.433-0.426,0.648-0.642c0.052-0.053,0.104-0.106,0.156-0.159
                C336.392,345.818,337.671,344.492,338.934,343.131z M327.999,60.389c0.932,0.62,1.856,1.25,2.77,1.892
                c10.699,7.973,20.575,17.313,28.31,27.368l-38.61,7.554L327.999,60.389z M181.138,97.203l-38.61-7.554
                c7.735-10.056,17.612-19.396,28.311-27.369c0.913-0.641,1.837-1.271,2.769-1.891L181.138,97.203z M116.508,166.869
                c0-22.335,5.623-43.406,15.8-61.82l58.063,11.46c0.839,0,0.839,0,1.679,0c2.518,0,4.197-0.839,6.715-1.679
                c2.518-1.679,3.357-5.036,2.518-7.554l-11.523-56.08c6.069-2.92,12.438-5.428,19.077-7.49v22.442c0,5.036,3.357,8.393,8.393,8.393
                s8.393-3.357,8.393-8.393V32.574V24.18c0-4.197,3.357-8.393,8.393-8.393h33.574c4.197,0,8.393,3.357,8.393,8.393v8.393v33.574
                c0,5.036,3.357,8.393,8.393,8.393c5.036,0,8.393-3.357,8.393-8.393V43.706c6.86,2.13,13.435,4.734,19.685,7.779l-11.291,54.952
                c0,2.518,0.839,5.875,2.518,7.554s3.357,2.518,5.875,2.518c0.839,0,0.839,0,1.679,0l57.687-12.145
                c10.416,18.576,16.175,39.894,16.175,62.505v8.393h-8.393H124.902h-8.393V166.869z M133.295,192.049h235.016v33.574
                c0,36.599-12.555,69.122-31.405,93.843l-0.49,0.163c-0.839,0.839-1.679,1.679-2.518,2.518c-4.223,5.631-8.68,10.765-13.337,15.394
                c-19.763,18.412-43.336,29.564-66.05,30.669c-1.143-0.491-2.425-0.738-3.708-0.738c-1.29,0-2.453,0.253-3.496,0.749
                c-13.904-0.638-28.134-5.045-41.623-12.584c-13.665-7.851-26.52-19.169-37.977-33.49c-0.839-0.839-1.679-1.679-2.518-2.518
                l-0.49-0.163c-18.85-24.722-31.405-57.245-31.405-93.843V192.049z M238.005,384.308l-22.628,50.913l-11.078-15.211l-34.912-48.34
                c-0.267-0.267-0.563-0.532-0.869-0.793l-9.203-12.637l3.357-15.108c1.138,1.225,2.292,2.419,3.457,3.594
                C185.833,366.877,210.408,380.942,238.005,384.308z M15.787,458.121c0-10.911,5.875-20.984,15.948-26.02
                c53.501-28.423,92.015-42.688,126.323-46.949l50.088,68.87l-6.359,31.796H15.787V458.121z M485.82,485.82H299.821l-6.359-31.796
                l50.63-69.616c34.188,5.159,73.391,19.413,125.78,46.855c10.072,5.875,15.948,15.948,15.948,26.859V485.82z"/>
            </g>
          </g>
          </svg>
        )
      } else if (payload.value === "Transporte") {
        return (
          <svg x={chartType=="Radar"?x-25:x-16} y={chartType=="Radar"?y-15:y-4} width={32} height={32} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="transportIconTitle" stroke={mode=="light"?"#000000":"#aaaaaa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="#000000"> <title id="transportIconTitle">Transport</title> <path d="M4 17H2V7H15V17H8"/> <path d="M20 17H22V12.5556L20 9H15V17H16"/> <circle cx="6" cy="17" r="2"/> <circle cx="18" cy="17" r="2"/> </svg>        
        )
      }
  }

    return (
        <div className="bg-white dark:bg-dark-background  flex flex-col items-center justify-center 
        w-full h-screen snap-center shrink-0">
            <h1 className="font-nunito font-bold text-6xl underline text-neutral-700
          dark:text-neutral-500 dark:bg-dark-background my-2 lg:my-4">{title}</h1>
            <div className="flex flex-row border-y-2 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-900/30 py-2 shadow-sm shadow-slate-300 dark:shadow-neutral-400 justify-around w-full my-4 gap-2 lg:gap-0">
              {
                mode=="dark" ? (
                  <Dropdown pill color="gray" className="font-nunito bg-neutral-900/30 border-0" label={chartTypeLabel}>
                    <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105" 
                    onClick={() => {setChartType("Radar"); setChartTypeLabel("Tipo: Radar")}}>
                        Radar
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-slate-100 dark:bg-neutral-800 text-blue-950 dark:text-neutral-400 rounded-xl dark:rounded-md border-slate-300 shadow-md shadow-blue-300 dark:shadow-neutral-400 hover:scale-105" 
                    onClick={() => {setChartType("Bar"); setChartTypeLabel("Tipo: Barras")}}>
                        Barras
                    </Dropdown.Item>
                </Dropdown>
                ) : (
                  <Dropdown pill outline color="light" className="font-nunito bg-transparent border-0" label={chartTypeLabel}>
                    <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {setChartType("Radar"); setChartTypeLabel("Tipo: Radar")}}>
                        Radar
                    </Dropdown.Item>
                    <Dropdown.Item className="bg-slate-100 text-neutral-700 rounded-xl border-slate-300 shadow-md shadow-blue-300  hover:from-cyan-500 hover:to-purple-600 hover:scale-105" 
                    onClick={() => {setChartType("Bar"); setChartTypeLabel("Tipo: Barras")}}>
                        Barras
                    </Dropdown.Item>
                </Dropdown>
                )
              }
            </div>
            <div ref={lineChartContainer} className="w-10/12 h-2/3">
            <ResponsiveContainer width="100%">
            {chartType == "Radar" && 
                <RadarChart outerRadius={225} width={1000} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="section" tick={renderCustomAxisTick} />
                    <Tooltip content={<CustomTooltipPatents />} />
                    <Radar name="Secciones" dataKey="val" stroke="#be123c" fill="#be123c" fillOpacity={0.6} 
                    activeDot={<CustomizedDot title={title} onDotClicked={onActiveDotClicked}/>}/>
                </RadarChart>
            }
            {chartType == "Bar" &&
                <BarChart height={400} data={data}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="section" tick={renderCustomAxisTick}/>
                <YAxis />
                <Tooltip content={<CustomTooltipPatents/>}/>
                <Bar dataKey="val" fill="#be123c" shape={<CustomizedBar title={title} onDotClicked={onActiveDotClicked}/>} activeBar={<CustomizedBar title={title} onDotClicked={onActiveDotClicked}/>}/>
              </BarChart>
            }
            </ResponsiveContainer>
            </div>
            <div className="flex flex-row justify-center gap-1 lg:gap-12 items-center w-full border-y-2 bg-slate-100 dark:bg-neutral-900/30 dark:border-neutral-700 py-2 shadow-sm shadow-slate-300">
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