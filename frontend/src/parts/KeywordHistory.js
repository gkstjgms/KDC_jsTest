import uniqueArray from "../utils/uniqueArray.js";

class KeywordHistory {
    $keywordHistory = null;
    data = null;

    constructor({ $target, onSearch }) {
        const $keywordHistory = document.createElement("ul");
        this.$keywordHistory = $keywordHistory;
        this.$keywordHistory.className = "KeywordHistory";
        $target.appendChild(this.$keywordHistory);

        this.onSearch = onSearch;
        this.init();
        this.render();
    }

    // 로컬 스트로지
    // let dummy = ["아", "cat"];
    init() {
        // key
        const data = this.getHistory();
        this.setState(data);
    }

    // 최근 키워드 저장
    addKeyword(keyword) {
        let keywordHistory = this.getHistory();
        keywordHistory.unshift(keyword); // push가 아니라 unshift - 넣는 방향 반대
        // 중복 제거
        keywordHistory = uniqueArray(keywordHistory);
        keywordHistory = keywordHistory.slice(0, 5);
        localStorage.setItem("keywordHistory", keywordHistory.join(",")); // string 변환
        this.init(); // 즉각 반영
    }

    getHistory() {
        return localStorage.getItem("keywordHistory") === null ? [] : localStorage.getItem("keywordHistory").split(",");
    }

    bindEvent() {
        this.$keywordHistory.querySelectorAll(`li button`).forEach(($item, index) => {
            $item.addEventListener("click", () => {
                this.onSearch(this.data[index]);
            });
        });
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        this.$keywordHistory.innerHTML = this.data
            .map(
                (keyword) => `
            <li><button>▶ ${keyword}</button></li>
            `
            )
            .join("");

        this.bindEvent();
    }
}

export default KeywordHistory;
