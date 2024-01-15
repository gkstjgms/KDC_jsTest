const TEMPLATE = '<input type="text">';

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

        $searchInput.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                // keyCode 13 = Enter
                onSearch(e.target.value); // keyword
            }
        });

        const $randomButton = document.createElement("button");
        this.$randomButton = $randomButton;
        this.$randomButton.className = "RandomButton";
        this.$randomButton.textContent = "Random Cat!";

        $wrapper.appendChild($randomButton);

        $randomButton.addEventListener("click", (e) => {
            onRandomSearch();
        });
    }
    render() {}
}
