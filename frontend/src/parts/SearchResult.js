class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;

    constructor({ $target, initialData, onClick }) {
        const $wrapper = document.createElement("section");
        this.$searchResult = document.createElement("ul");

        $wrapper.className = "Result";
        this.$searchResult.className = "SearchResult";
        $target.appendChild($wrapper);
        $wrapper.appendChild(this.$searchResult);

        this.data = initialData;
        this.onClick = onClick;

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        this.$searchResult.innerHTML = this.data
            .map(
                (cat) => `
                <li class="item">
                    <img src=${cat.url} alt=${cat.name} />
                </li>
                `
            )
            .join("");

        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
            $item.addEventListener("click", () => {
                this.onClick(this.data[index]);
            });
        });
    }
}
