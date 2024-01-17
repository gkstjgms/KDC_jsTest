import KeywordHistory from "./KeywordHistory.js";

class SearchInput {
    constructor({ $target, onSearch, onRandomSearch }) {
        const $wrapper = document.createElement("section");
        $wrapper.className = "Input";
        $target.appendChild($wrapper);

        const $searchInput = document.createElement("input");
        this.$searchInput = $searchInput;
        this.$searchInput.placeholder = "고양이를 검색해보세요. |";

        $searchInput.className = "SearchInput";
        $wrapper.appendChild($searchInput);

        // 검색 & 검색 단어 저장
        $searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                // keyCode 13 = Enter
                // 키워드 서치
                onSearch(e.target.value);

                // 최근 키워드 저장
                this.KeywordHistory.addKeyword(e.target.value);
            }
        });

        // 랜덤 고양이 출력
        const $randomButton = document.createElement("button");
        this.$randomButton = $randomButton;
        this.$randomButton.className = "RandomButton";
        this.$randomButton.textContent = "Random Cat!";

        $wrapper.appendChild($randomButton);

        $randomButton.addEventListener("click", (e) => {
            onRandomSearch();
        });

        this.KeywordHistory = new KeywordHistory({
            $target,
            onSearch,
        });
    }
    render() {}
}

export default SearchInput;
