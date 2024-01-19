import api from "../api.js";

class ImageInfo {
    $imageInfo = null;
    data = null;

    constructor({ $target, data }) {
        const $imageInfo = document.createElement("div");
        $imageInfo.className = "ImageInfo";
        this.$imageInfo = $imageInfo;
        $target.appendChild($imageInfo);

        this.data = data;

        this.render();
    }

    setFade(visible) {
        if (visible) {
            this.$imageInfo.classList.add("show");
        } else {
            this.$imageInfo.classList.remove("show");
        }
    }

    setState(nextData) {
        this.data = nextData;
        this.setFade(nextData.visible);
        this.render();
    }

    closeImageInfo() {
        this.setState({
            visible: false,
            cat: undefined,
        });
    }

    async showDetail(data) {
        // 상세 정보 요청
        const detailInfo = await api.fetchCatsDetail(data.cat.id);
        if (detailInfo) {
            // 정보를 업데이트
            this.setState({
                visible: true,
                cat: detailInfo.data,
            });
        }
    }

    render() {
        if (this.data.visible) {
            const { name, url, temperament, origin } = this.data.cat;

            this.$imageInfo.innerHTML = `
            <div class="content-wrapper">
                <div class="title">
                    <span>${name}</span>
                    <div class="close">X</div>
                </div>
                <img src="${url}" alt="${name}"/>        
                <div class="description">
                    <div>성격: ${temperament}</div>
                    <div>태생: ${origin}</div>
                </div>
            </div>`;
            // this.$imageInfo.style.display = "block";

            this.$imageInfo.addEventListener("click", (e) => {
                if (e.target.className === "ImageInfo show" || e.target.className === "close") {
                    this.closeImageInfo();
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.keyCode === 27) {
                    // keyCode 27 = ESC
                    this.closeImageInfo();
                }
            });
        } else {
            // this.$imageInfo.style.display = "none";
        }
    }
}

export default ImageInfo;
