import axios from 'axios'

const baseUrl = 'https://i.snssdk.com/'

const getEntries = (keyword, offset = 0) => {
    const req = axios.get(`${baseUrl}search/api/study?keyword=${keyword}&offset=${offset}`)
    return req.then(res => res.data)
}


const getHotSpot = () => {
    const req = axios.get(`https://ib.snssdk.com/api/suggest_words/?business_id=10017`)
    return req.then(
        res => {
            const hotSpots = res.data.data[0].words.map(spot => spot.word)
            return hotSpots.slice(0, 10)
        }
    )
}

const getSuggestedWords = (keyword) => {
    const req = axios.get(`${baseUrl}search/api/sug/?keyword=${keyword}`)
    return req.then(
        res => {
            const sugs = res.data.data
            return !keyword ? [] : sugs.map(sugs => new Object({ value: sugs.keyword }))
        }
    )
}

const getSearchSuggest = () => {
    const req = axios.get(`https://so.toutiao.com/search/suggest/initial_page/`)
    return req.then(res => res.data.data.suggest_words.slice(0, 10))
}

export default {
    getEntries,
    getSuggestedWords,
    getHotSpot,
    getSearchSuggest
}