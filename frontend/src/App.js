console.log("App is running!");

class App {
    $target = null;
    data = [];

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
            onClick: (image) => {
                this.imageInfo.setState({
                    visible: true,
                    image,
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
    }

    setState(nextData) {
        console.log(this);
        this.data = nextData;
        this.searchResult.setState(nextData);
    }
}
