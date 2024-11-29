const URL_PREFIX = "http://localhost:5000/"


export const fetchDocumentsByYear =  () => fetchData("documents", "year")
export const fetchDocumentsByMonth = () => fetchData("documents", "month")
export const fetchArticlesByYear =   () => fetchData("articles", "year")
export const fetchArticlesByMonth =  () => fetchData("articles", "month")
export const fetchIsbnByYear =       () => fetchData("isbn", "year")
export const fetchIsbnByMonth =      () => fetchData("isbn", "month")

async function fetchData(type, timeLapse){
    const response = await fetch(`${URL_PREFIX}${type}/${timeLapse}`);
    if (!response.ok)
        throw new Error(`Failed to fetch data: <type: ${type}> <time: ${timeLapse}>`);

    const data = await response.json();
    return data;
}

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
