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

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    closeImageInfo() {
        this.setState({
            visible: false,
            cat: undefined,
        });
    }

    // async/await 추가 구현
    showDetail(data) {
        // 상세 정보 요청
        api.fetchCatsDetail(data.cat.id).then(({ data }) => {
            // 정보를 업데이트
            this.setState({
                visible: true,
                cat: data,
            });
        });
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
            this.$imageInfo.style.display = "block";

            this.$imageInfo.addEventListener("click", (e) => {
                if (e.target.className === "ImageInfo" || e.target.className === "close") {
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
            this.$imageInfo.style.display = "none";
        }
    }
}
