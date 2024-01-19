import Empty from "./Empty.js";

class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;

    constructor({ $target, initialData, onClick, onNextPage }) {
        const $wrapper = document.createElement("section");
        this.$searchResult = document.createElement("ul");

        $wrapper.className = "Result";
        this.$searchResult.className = "SearchResult";

        $target.appendChild($wrapper);
        $wrapper.appendChild(this.$searchResult);

        this.data = initialData;
        this.onClick = onClick;
        this.onNextPage = onNextPage;

        this.Empty = new Empty({
            $target: $wrapper,
        });

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.Empty.show(nextData);
        this.render();
    }

    listObserver = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            // 아이템이 화면에 보일 때
            if (item.isIntersecting) {
                // 고양이 이미지를 로드
                item.target.querySelector("img").src = item.target.querySelector("img").dataset.src;
                // 마지막 요소를 찾는다 => index를 통해
                let dataIndex = Number(item.target.dataset.index);
                // 마지막 요소 발견 시 nextPage 호출
                if (dataIndex + 1 === this.data.length) {
                    this.onNextPage();
                }
            }
        });
    });

    render() {
        this.data === null || this.data.length === 0 ? (this.$searchResult.style.display = "none") : null;
        this.$searchResult.style.display = "grid";
        if (this.data !== null) {
            this.$searchResult.innerHTML = this.data
                .map(
                    (cat, index) => `
                <li class="item" data-index=${index}>
                    <img src="https://via.placeholder.com/200x300" data-src=${cat.url} alt=${cat.name} />
                    <div class="content"> ${cat.name} </div>
                </li>
                `
                )
                .join("");
        }

        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
            $item.addEventListener("click", () => {
                this.onClick(this.data[index]);
            });

            this.listObserver.observe($item);
        });
    }
}

export default SearchResult;
