class DarkModeToggle {
    isDarkMode = null;

    constructor({ $target }) {
        const $wrapper = document.createElement("section");
        const $darkModeToggle = document.createElement("input");
        this.$darkModeToggle = $darkModeToggle;
        this.$darkModeToggle.type = "checkbox";

        $wrapper.className = "Toggle";
        $darkModeToggle.className = "DarkModeToggle";
        $target.appendChild($wrapper);
        $wrapper.appendChild($darkModeToggle);

        $darkModeToggle.addEventListener("change", (e) => {
            console.dir(e.target.checked);
            this.setColorMode(e.target.checked);
        });

        this.initColorMode();
    }

    initColorMode() {
        // isDarkMode state, checkbox 상태, html attr 초기화
        this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.$darkModeToggle.checked = this.isDarkMode;
        this.setColorMode(this.isDarkMode);
    }

    setColorMode(isDarkMode) {
        document.documentElement.setAttribute("color-mode", isDarkMode ? "dark" : "light");
    }

    render() {}
}

export default DarkModeToggle;
