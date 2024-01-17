console.log("App is running!");

import api from "./api.js";
import Loading from "./parts/Loading.js";
import DarkModeToggle from "./parts/DarkModeToggle.js";
import SearchInput from "./parts/SearchInput.js";
import SearchResult from "./parts/SearchResult.js";
import ImageInfo from "./parts/ImageInfo.js";

class App {
    $target = null;
    DEFAULT_PAGE = 1;
    data = {
        items: [],
        page: this.DEFAULT_PAGE,
    };

    // 초기화
    constructor($target) {
        this.$target = $target;

        this.loading = new Loading({
            $target,
        });

        this.darkModeToggle = new DarkModeToggle({
            $target,
        });

        this.searchInput = new SearchInput({
            $target,
            onSearch: (keyword) => {
                // 로딩 start
                this.loading.show();
                api.fetchCats(keyword).then(({ data }) => {
                    this.setState({ items: data, page: this.DEFAULT_PAGE });
                    // 로딩 hide
                    this.loading.hide();
                    // 검색 data 로컬에 저장
                    this.saveResult(data);
                });
            },
            onRandomSearch: () => {
                // 로딩 start
                this.loading.show();
                api.fetchRandomCats().then(({ data }) => {
                    this.setState({ items: data, page: this.DEFAULT_PAGE });
                    // 로딩 hide
                    this.loading.hide();
                });
            },
        });

        this.searchResult = new SearchResult({
            $target,
            initialData: this.data.items,
            onClick: (cat) => {
                this.imageInfo.showDetail({
                    visible: true,
                    cat,
                });
            },
            onNextPage: () => {
                this.loading.show();
                const keywordHistory = localStorage.getItem("keywordHistory") === null ? [] : localStorage.getItem("keywordHistory").split(",");

                const lastKeyword = keywordHistory[0];
                const page = this.page + 1;
                api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
                    // concat: 과거 data + 새 data 배열끼리 합치기
                    let newData = this.data.concat(data);

                    this.setState({
                        items: newData,
                        page: page,
                    });

                    // 로딩 hide
                    this.loading.hide();
                });
            },
        });

        this.imageInfo = new ImageInfo({
            $target,
            data: {
                visible: false,
                image: null,
            },
        });

        this.init();
    }

    setState(nextData) {
        this.data = nextData;
        this.searchResult.setState(nextData.items);
    }

    saveResult(result) {
        localStorage.setItem("lastResult", JSON.stringify(result));
    }

    init() {
        const lastResult = localStorage.getItem("lastResult") === null ? [] : JSON.parse(localStorage.getItem("lastResult"));
        this.setState({
            items: lastResult,
            page: this.DEFAULT_PAGE,
        });
    }
}

export default App;
