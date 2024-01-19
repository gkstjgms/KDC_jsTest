import config from "./config.js";
import error from "./error.js";

const { API_ENDPOINT } = config;
const { REQUEST_ERROR } = error;

/**
 *
 * @param url key url
 * @returns 결과의 json 값
 */
const request = async (url) => {
    // 오류 감지
    try {
        const result = await fetch(`${API_ENDPOINT}/api/cats/${url}`);
        if (result.status === 200) {
            // status 200 = 성공의 경우
            return result.json();
        } else {
            throw REQUEST_ERROR[result.status];
        }
    } catch (error) {
        console.log(error.msg);
        return { data: null };
    }
};

const api = {
    /** limit 없는 검색
     *
     * @param keyword 검색하는 단어
     * @returns items data
     */
    fetchCats: (keyword) => {
        return request(`search?q=${keyword}`);
    },
    /** limit 있는 검색
     *
     * @param keyword 검색하는 단어
     * @param limit 최대 노출 개수
     * @returns items data
     */
    fetchCatsWithLimit: (keyword, limit) => {
        return request(`search?q=${keyword}&limit=${limit}`);
    },
    /** 랜덤 data 출력
     *
     * @returns random items data
     */
    fetchRandomCats: () => {
        return request(`random50`);
    },
    /** id에 해당하는 detail 반환
     *
     * @param id
     * @returns detail data
     */
    fetchCatsDetail: (id) => {
        return request(`${id}`);
    },
    /** 다음 페이지 로딩
     *
     * @param keyword 검색하는 단어
     * @param page 필요 페이지
     * @returns items data
     */
    fetchCatsPage: (keyword, page) => {
        return request(`search?q=${keyword}&page=${page}`);
    },
};

export default api;
