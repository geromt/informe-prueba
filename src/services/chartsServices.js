export const chartToSVG = (container) => {
    const svg = container.getElementsByTagName("svg")[0]
    const svgURL = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});
    const url = window.URL || window.webkitURL;
    const link = url.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.setAttribute("download", "chart.svg");
    a.setAttribute("href", link);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

export const dataToTxt = (dataObject) => {
    const dataBlob = new Blob([JSON.stringify(dataObject)], {type: "text/plain;charset=utf-8"});
    const url = window.URL || window.webkitURL;
    const link = url.createObjectURL(dataBlob);
    const a = document.createElement("a");
    a.setAttribute("download", "data.txt");
    a.setAttribute("href", link); 
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a);
  }