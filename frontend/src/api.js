import config from "./config.js";
import error from "./error.js";
const { API_ENDPOINT } = config;
const { REQUEST_ERROR } = error;

const request = async (url) => {
    try {
        const result = await fetch(url);
        if (result.status === 200) {
            // status 200 성공의 경우
            return result.json();
        } else {
            throw REQUEST_ERROR[result.status];
        }
    } catch (error) {
        alert(error.msg);
        return { data: null };
    }
};

const api = {
    // data 가져오는 api
    fetchCats: (keyword) => {
        return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    },
    // 다음 페이지 로딩 api
    fetchCatsPage: (keyword, page) => {
        return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${keyword}`);
    },
    // 랜덤 data 가져오는 api
    fetchRandomCats: () => {
        return request(`${API_ENDPOINT}/api/cats/random50`);
    },
    // id로 detail 가져오는 api
    fetchCatsDetail: (id) => {
        return request(`${API_ENDPOINT}/api/cats/${id}`);
    },
};

export default api;
