console.log("App is running!");

class App {
    $target = null;
    data = [];
    page = 1;

    // 초기화
    constructor($target) {
        this.$target = $target;

        this.darkModeToggle = new DarkModeToggle({
            $target,
        });

        this.searchInput = new SearchInput({
            $target,
            onSearch: (keyword) => {
                // 로딩 start
                this.loading.show();
                api.fetchCats(keyword).then(({ data }) => {
                    this.setState(data);
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
                    this.setState(data);
                    // 로딩 hide
                    this.loading.hide();
                });
            },
        });

        this.loading = new Loading({
            $target,
        });

        this.searchResult = new SearchResult({
            $target,
            initialData: this.data,
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

                    this.setState(newData);
                    this.page = page;

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
        this.searchResult.setState(nextData);
    }

    saveResult(result) {
        localStorage.setItem("lastResult", JSON.stringify(result));
    }

    init() {
        const lastResult = localStorage.getItem("lastResult") === null ? [] : JSON.parse(localStorage.getItem("lastResult"));
        this.setState(lastResult);
    }
}
