const URL_PREFIX = "http://localhost:5000/"


export const fetchDocumentsByYear =  (sex=null) => fetchData("documents", "year", sex)
export const fetchDocumentsByMonth = (sex=null) => fetchData("documents", "month", sex)
export const fetchArticlesByYear =   (sex=null) => fetchData("articles", "year",sex)
export const fetchArticlesByMonth =  (sex=null) => fetchData("articles", "month", sex)
export const fetchIsbnByYear =       (sex=null) => fetchData("isbn", "year", sex)
export const fetchIsbnByMonth =      (sex=null) => fetchData("isbn", "month", sex)
export const fetchProjects =         (sex=null) => fetchData("proyectos", "", sex)
export const fetchPatents =          () => fetchData("patentes", "", null)

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

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
