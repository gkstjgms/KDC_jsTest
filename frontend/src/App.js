console.log("App is running!");

// api
import api from "./api.js";

// parts
import DarkModeToggle from "./parts/DarkModeToggle.js";
import SearchInput from "./parts/SearchInput.js";
import Banner from "./parts/Banner.js";
import SearchResult from "./parts/SearchResult.js";

// etc
import ImageInfo from "./parts/ImageInfo.js";
import Loading from "./parts/Loading.js";

class App {
    // 초기화
    $target = null;
    DEFAULT_PAGE = 1;

    /**
     * Array items: data 목록
     * Number page: page 숫자
     */
    data = {
        items: [], // data 목록
        page: this.DEFAULT_PAGE, // page
    };

    constructor($target) {
        this.$target = $target;

        // * parts
        // DarkModeToggle.js
        this.darkModeToggle = new DarkModeToggle({
            $target,
        });

        // SearchInput.js
        this.searchInput = new SearchInput({
            $target,
            /** 검색
             *
             * @param keyword 검색하는 단어
             * @param limit 최대 노출 개수
             */
            onSearch: (keyword, limit) => {
                this.loading.show();
                // data 가져오는 api
                api.fetchCatsWithLimit(keyword, limit).then(({ data }) => {
                    this.setState({ items: data, page: this.DEFAULT_PAGE });
                    this.loading.hide();
                    // 검색 결과 data를 로컬에 저장
                    this.saveResult(data);
                });
            },
            /**
             * 랜덤 결과 출력 button
             */
            onRandomSearch: () => {
                this.loading.show();
                api.fetchRandomCats().then(({ data }) => {
                    this.setState({ items: data, page: this.DEFAULT_PAGE });
                    this.loading.hide();
                });
            },
        });

        // Banner.js
        this.banner = new Banner({
            $target,
        });

        // SearchResult.js
        this.searchResult = new SearchResult({
            $target,
            initialData: this.data.items,
            /**
             * 현재 페이지 유지하며 다음 페이지 출력
             */
            onNextPage: () => {
                this.loading.show();

                // 로컬에 저장된 keywordHistory array로 반환
                // keywordHistory = null일 경우 빈 array 반환
                const keywordHistory = localStorage.getItem("keywordHistory") === null ? [] : localStorage.getItem("keywordHistory").split(",");

                // 제일 최근에 사용한 Keyword 변수
                const lastKeyword = keywordHistory[0];
                // 현재 페이지 +1
                const page = this.data.page + 1;

                // 다음 페이지 출력 api
                api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
                    // 현재 data array(this.data.items) + 새 data array(data) 결합
                    let newData = this.data.items.concat(data);
                    // 상태 변화
                    this.setState({
                        items: newData,
                        page: page,
                    });
                    this.loading.hide();
                });
            },
            /**
             *
             * @param item click 시 ImageInfo 실행
             */
            onClick: (item) => {
                this.imageInfo.showDetail({
                    visible: true,
                    item,
                });
            },
        });

        // * etc
        // ImageInfo.js
        this.imageInfo = new ImageInfo({
            $target,
            // 기본 data -> click 전까지는 화면에 보이지 않음
            data: {
                visible: false,
                image: null,
            },
        });

        // Loading.js
        this.loading = new Loading({
            $target,
        });

        this.init();
    }

    /** 검색 결과 data를 로컬에 저장
     *
     * @param result Array
     */
    saveResult(result) {
        localStorage.setItem("lastResult", JSON.stringify(result));
    }

    // 상태 변화
    setState(nextData) {
        this.data = nextData;
        // SearchResult의 상태를 최신 items 목록으로 변경
        this.searchResult.setState(nextData.items);
    }

    // 최근 검색 목록 유지를 위한 로컬 저장
    init() {
        const lastResult = localStorage.getItem("lastResult") === null ? [] : JSON.parse(localStorage.getItem("lastResult"));
        this.setState({
            items: lastResult,
            page: this.DEFAULT_PAGE,
        });
    }
}

export default App;
