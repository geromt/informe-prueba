const URL_PREFIX = "http://localhost:5000/"


export const fetchDocuments =  (sex=null, timeLapse="year") => fetchData("documents", timeLapse, sex)
export const fetchArticles =   (sex=null, timeLapse="year") => fetchData("articles", timeLapse, sex)
export const fetchIsbn =       (sex=null, timeLapse="year") => fetchData("isbn", timeLapse, sex)
export const fetchHumanindex = (sex=null, timeLapse="year") => fetchData("humanindex", timeLapse, sex)
export const fetchProjects =         (sex=null) => fetchData("proyectos", "", sex)
export const fetchParticipacionesProjects =  (sex=null) => fetchData("participaciones-proyectos", "", sex)
export const fetchPatents =          () => fetchData("patentes", "", null)

const dataTypeMapping = {"Documentos": "documents", "Artículos": "articles", "ISBN": "isbn", "Humanindex": "humanindex"}
async function fetchData(type, timeLapse, sex=null){
    let response = null
    if (sex == null){
        response = await fetch(`${URL_PREFIX}${type}/${timeLapse}`);
    } else {
        if (sex == "M" || sex == "F"){
            response = await fetch(`${URL_PREFIX}${type}/${timeLapse}?sexo=${sex}`);
        } else {
            throw new Error("Sexo no válido");
        }
    }
    
    if (!response.ok)
        throw new Error(`Failed to fetch data: <type: ${type}> <time: ${timeLapse}>`);

    const data = await response.json();
    return data;
}

export async function fetchDeserializeData(dataType, timeLapse, time, dataKey, page, sex=null, title=null){
    console.log(title)
    let fetchURL = `${URL_PREFIX}deserialize/${dataTypeMapping[dataType]}/${timeLapse}/${time}/${dataKey}/${page}`
    if (sex != null || title != null){
        fetchURL += `?`
        if (sex != null)
            if (sex == "M" || sex == "F")
                fetchURL += `sexo=${sex}`
        if (title != null){
            console.log(title)
            fetchURL += `titulo=${title}`
        }
    }
    console.log(fetchURL)

    const response = await fetch(fetchURL);

    if (!response.ok)
        throw new Error(`Failed to fetch data: <type: ${dataKey}> <page:${page}>`);

    const data = await response.json();
    console.log(data)
    return data;
}

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
