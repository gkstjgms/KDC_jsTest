const API_ENDPOINT = "http://localhost:4001"; // ERR_SSL_PROTOCOL_ERROR: https://로 호출하지 말 것

const api = {
    // data 가져오는 api
    fetchCats: (keyword) => {
        return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then((res) => res.json());
    },
    // 다음 페이지 로딩 api
    fetchCatsPage: (keyword, page) => {
        return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${keyword}`).then((res) => res.json());
    },
    // 랜덤 data 가져오는 api
    fetchRandomCats: () => {
        return fetch(`${API_ENDPOINT}/api/cats/random50`).then((res) => res.json());
    },
    // id로 detail 가져오는 api
    fetchCatsDetail: (id) => {
        return fetch(`${API_ENDPOINT}/api/cats/${id}`).then((res) => res.json());
    },
};
