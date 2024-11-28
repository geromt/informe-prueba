const GET_DOCUMENTS_BY_YEAR_URL = "http://localhost:5000/documents/year"


export async function fetchDocumentsData(from_year=2019, to_year=2023){
    const response = await fetch(GET_DOCUMENTS_BY_YEAR_URL);
    if (!response.ok)
        throw new Error('Failed to fetch data');

    const data = await response.json();
    return data;
}

export function transformData(data){
    const transformedData = [];
    let nextName = null;
    if (data.time_lapse == "year"){
        nextName = (current) => current+1;
    }
    let currentKey = data.from
    console.log(currentKey)
    while (currentKey <= data.to){
        let ob = {};
        ob.name = currentKey;
        if (currentKey in data.wos_data) ob.wos = data.wos_data[currentKey];
        if (currentKey in data.scotus_data) ob.scotus = data.scotus_data[currentKey];
        if (currentKey in data.pubmed_data) ob.pubmed = data.pubmed_data[currentKey];
        if (currentKey in data.wos_scotus_data) ob.wos_scotus = data.wos_scotus_data[currentKey];
        transformedData.push(ob);
        currentKey = nextName(currentKey);
    }
    return transformedData;
}

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
